"use client";
import ConnectWalletAlert from "@/components/connectWalletAlert/connectWalletAlert";
import "./invitations.scss";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import SmallTitle from "@/components/smalltitle/smalltitle";
import { Button, Container, Row, Table } from "react-bootstrap";

const Invitations = () => {
  const { isConnected } = useWeb3ModalAccount();
  function handleAccept(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  function handleDecline(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="profile_page">
       <SmallTitle title="Invitations" className="text-start" />

      {!isConnected ? (
        <ConnectWalletAlert />
      ) : (
        <Container>
          <Row>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invitee Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th> {/* Added column for buttons */}
                </tr>
              </thead>
              <tbody>
                {/* Example row */}
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Pending</td>
                  <td>
                    {/* Accept and Decline buttons */}
                    <Button variant="success" onClick={() => handleAccept('1')}>Accept</Button>{' '}
                    <Button variant="danger" onClick={() => handleDecline('1')}>Decline</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Invitations;
