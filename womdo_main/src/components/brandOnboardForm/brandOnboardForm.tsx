// components/BrandOnboardForm.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Container, Row, Col } from "react-bootstrap";
import "./brandOnboardForm.scss";
import Button from "../button/button";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import WomdoAbi from "../../app/(auth)/abi/Womdo.json";
import UsdtAbi from "../../app/(auth)/abi/TetherUSD.json";
import toast from "react-hot-toast";
import { UsdtAddress, WomdoAddress } from "@/utils/constants";
import { getError } from "@/utils/common.service";
import Loader from "../loader/loader";

interface FormValues {
  brandName: string;
  category: string;
  amount: string;
  noOfInfluencers: string;
}

const BrandOnboardForm: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider }: any = useWeb3ModalProvider();

  const categories = [
    "Music",
    "Lifestyle",
    "Education",
    "Sports",
    "Gaming",
    "News",
    "Comedy",
    "Entertainment",
    "Film & Animation",
    "Science & Technology",
    "Travel & Events",
  ];
  const formik = useFormik<FormValues>({
    initialValues: {
      brandName: "",
      category: "",
      amount: "",
      noOfInfluencers: "",
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required("Brand Name is required"),
      category: Yup.string().required("Category is required"),
      amount: Yup.string().required("Budget is required"),
      noOfInfluencers: Yup.string().required(
        "Number of Influencers is required"
      ),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      console.log("Form data:", values);

      if (!isConnected) {
        toast.error("Please connect wallet!");
        return;
      }

      try {
        setLoader(true);
        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );
        const signer = ethersProvider.getSigner();
        // The Contract object
        const UsdtContract = new ethers.Contract(UsdtAddress, UsdtAbi, signer);
        const decimal = await UsdtContract.decimals();
        const amount = ethers.utils.parseUnits(values.amount, decimal);
        const allowance = await UsdtContract.allowance(address, WomdoAddress);
        if (amount.gt(allowance)) {
          const approval = await UsdtContract.approve(WomdoAddress, amount);
          const reciept = await approval.wait(1);
          if (!reciept) {
            toast.error("Approval failed");
            return;
          }
        }
        const WomdoContract = new ethers.Contract(
          WomdoAddress,
          WomdoAbi,
          signer
        );
        console.log("WomdoContract", WomdoContract);
        const registerAd = await WomdoContract.registerAd(
          values.noOfInfluencers,
          amount,
          values.brandName,
          values.category
        );
        const reciept = await registerAd.wait(1);
        if (!reciept) {
          toast.error("Register Ad failed");
          return;
        }
        formik.resetForm();
        setLoader(false);
        toast.success("Ad registered successfully!");
      } catch (error: any) {
        setLoader(false);
        toast.error(getError(error));
      }
    },
  });
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            <Col md="6">
              <div className="form-container">
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="brandName" className="form-group">
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("brandName")}
                      isInvalid={
                        !!formik.errors.brandName && formik.touched.brandName
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.brandName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="category" className="form-group">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      {...formik.getFieldProps("category")}
                      isInvalid={
                        !!formik.errors.category && formik.touched.category
                      }
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="amount" className="form-group">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("amount")}
                      isInvalid={
                        !!formik.errors.amount && formik.touched.amount
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    controlId="noOfInfluencers"
                    className="form-group"
                  >
                    <Form.Label>Number of Influencers</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("noOfInfluencers")}
                      isInvalid={
                        !!formik.errors.noOfInfluencers &&
                        formik.touched.noOfInfluencers
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.noOfInfluencers}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="form-button">
                    <Button fluid className="custom_btn" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default BrandOnboardForm;
