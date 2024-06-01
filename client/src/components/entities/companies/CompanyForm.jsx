import { useEditCompanyMutation } from "@/features/api/companies";
import {
  Button,
  FormLabel,
  FormControl,
  Input,
  Text,
  Divider,
  useToast,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CompanyForm = ({ company }) => {
  const [formCompany, setFormCompany] = useState(
    company || {
      billingAddress: {},
      shippingAddress: {},
    },
  );
  const [editCompany, { isLoading }] = useEditCompanyMutation();
  const [errors, setErrors] = useState({});
  const toast = useToast();

  // Synchroniser l'état local avec les props entrantes
  useEffect(() => {
    setFormCompany(company);
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCompany((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formCompany.name) newErrors.name = "Company Name is required";
    if (!formCompany.description) newErrors.description = "Description is required";
    if (!formCompany.website) newErrors.website = "Website is required";
    if (!formCompany.companyType) newErrors.companyType = "Type is required";
    if (!formCompany.industry) newErrors.industry = "Industry is required";
    if (!formCompany.employees || formCompany.employees < 1)
      newErrors.employees = "Number of employees must be at least 1";
    if (!formCompany.annualRevenue || formCompany.annualRevenue < 1000)
      newErrors.annualRevenue = "Annual revenue must be at least 1000";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await editCompany({
        id: company._id,
        company: formCompany,
      }).unwrap();
      toast({
        title: "Company updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Company updating failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <SimpleGrid columns={2} spacing={4} w="full">
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Company Name</FormLabel>
            <Input name="name" value={formCompany.name} onChange={handleChange} />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formCompany.description}
              onChange={handleChange}
            />
            {errors.description && <Text color="red.500">{errors.description}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.website}>
            <FormLabel>Website</FormLabel>
            <Input name="website" value={formCompany.website} onChange={handleChange} />
            {errors.website && <Text color="red.500">{errors.website}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.companyType}>
            <FormLabel>Type</FormLabel>
            <Input
              name="companyType"
              value={formCompany.companyType}
              onChange={handleChange}
            />
            {errors.companyType && <Text color="red.500">{errors.companyType}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.industry}>
            <FormLabel>Industry</FormLabel>
            <Input name="industry" value={formCompany.industry} onChange={handleChange} />
            {errors.industry && <Text color="red.500">{errors.industry}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.employees}>
            <FormLabel>Number of Employees</FormLabel>
            <Input
              type="number"
              name="employees"
              value={formCompany.employees}
              onChange={handleChange}
            />
            {errors.employees && <Text color="red.500">{errors.employees}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.annualRevenue}>
            <FormLabel>Annual Revenue</FormLabel>
            <Input
              type="number"
              name="annualRevenue"
              value={formCompany.annualRevenue}
              onChange={handleChange}
            />
            {errors.annualRevenue && <Text color="red.500">{errors.annualRevenue}</Text>}
          </FormControl>
          <Divider orientation="horizontal" />
          <FormControl>
            <FormLabel>Billing Address</FormLabel>
            <Input
              placeholder="Street"
              value={formCompany.billingAddress?.Street}
              name="billingAddress.Street"
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              value={formCompany.billingAddress?.City}
              name="billingAddress.City"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="State"
              value={formCompany.billingAddress?.State}
              name="billingAddress.State"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Billing Code"
              value={formCompany.billingAddress?.BillingCode}
              name="billingAddress.BillingCode"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Postal Code"
              value={formCompany.billingAddress?.PostalCode}
              name="billingAddress.PostalCode"
              onChange={handleChange}
              mt={2}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Shipping Address</FormLabel>
            <Input
              placeholder="Street"
              value={formCompany.shippingAddress?.Street}
              name="shippingAddress.Street"
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              value={formCompany.shippingAddress?.City}
              name="shippingAddress.City"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Shipping Code"
              value={formCompany.shippingAddress?.ShippingCode}
              name="shippingAddress.ShippingCode"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Postal Code"
              value={formCompany.shippingAddress?.PostalCode}
              name="shippingAddress.PostalCode"
              onChange={handleChange}
              mt={2}
            />
          </FormControl>
        </SimpleGrid>
      </VStack>
      <Button colorScheme="blue" type="submit" isLoading={isLoading} w="100%">
        Save
      </Button>
    </form>
  );
};

export default CompanyForm;
