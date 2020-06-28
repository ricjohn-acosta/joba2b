import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Drawer from "./Drawer";
import Link from "@material-ui/core/Link";
import { addUser } from "../../store/actions/users";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import BrandLogo from "./BrandLogo";
import { signin, signout, useSession } from "next-auth/client";

// Main wrapper
const StyledLowerNavbar = styled(AppBar)`
  background-color: white;
  color: black
  display: flex;
  ${(props) => props.theme.breakpoints.down("sm")} {
    background: rgb(91,184,209);
    background: linear-gradient(270deg, rgba(91,184,209,1) 0%, rgba(21,215,215,1) 100%);
    padding-left: 1vw
  }
`;

// Buttons on the right hand side of the navbar
const UserButtons = styled(Button)`
  color: #404040;
  position: relative;
  float: right;
  height: 100%;
  padding: 1.5vw;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

// Contains the Drawer component
const DrawerContainer = styled.div`
  color: #404040;
  position: relative;
  float: right;
  height: 50%;
  ${(props) => props.theme.breakpoints.up("md")} {
    display: none;
  }
`;

// Buttons on the left hand side of the navbar (next to the brand logo)
const MiscButtons = styled(Button)`
  color: #404040;
  position: relative;
  height: 100%;
  padding: 1.5vw;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

// Container for the grid
const Container = styled.div`
  position: relative;
  height: 100%;
  margin-left: 10vw;
  margin-right: 15vw;
  color: black;
  ${(props) => props.theme.breakpoints.down(1300)} {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const LowerNavbar = ({ session, addUser }) => {
  const router = useRouter();

  return (
    <StyledLowerNavbar elevation={0} position="sticky" component="div">
      {console.log(router)}
      <Container>
        <Grid container direction="row">
          <Grid item container xs={6} sm={6} md={8}>
            <BrandLogo>IsItBetterThere</BrandLogo>
            <Link
              component={MiscButtons}
              href={
                router.pathname === "/"
                  ? "#/howitworks"
                  : "http://localhost:3000/#/howitworks"
              }
              style={{ textDecoration: "none" }}
              disableRipple
            >
              How it works
            </Link>
            <Link
              component={MiscButtons}
              href={
                router.pathname === "/"
                  ? "#/learn"
                  : "http://localhost:3000/#/learn"
              }
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Learn
            </Link>
            <Link
              component={MiscButtons}
              href={"/share"}
              style={{ textDecoration: "none" }}
              disableRipple
            >
              Share your experience
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <UserButtons disableRipple>Account</UserButtons>
            {session ? (
              <UserButtons
                onClick={(e) => {
                  signout();
                }}
              >
                Sign out
              </UserButtons>
            ) : (
              // Add custom signup page when next-auth is stable
              // <UserButtons href={"/signup"}>Sign up | Login</UserButtons>
              <UserButtons
                href={"/api/auth/signin"}
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                Sign up | Login
              </UserButtons>
            )}
            {/* {session ? null : <UserButtons disableRipple>Login</UserButtons>} */}
            <DrawerContainer>
              <Drawer />
            </DrawerContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledLowerNavbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(LowerNavbar);
