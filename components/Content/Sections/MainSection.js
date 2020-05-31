import styled, { keyframes } from "styled-components";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Wrapper = styled(Box)`
  background: rgb(144, 144, 209);
  background: linear-gradient(
    180deg,
    rgba(144, 144, 209, 1) 0%,
    rgba(255, 255, 255, 1) 0%,
    rgba(203, 246, 255, 1) 100%
  );
  min-height: 70vh;
  padding-top: 10vh;
  overflow: hidden;
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-top: 20vh;
  }
`;

const InputContainer = styled(Grid)`
  height: 100%;
  width: 100%;
`;

const InputForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 0;
    margin-bottom: 50px;
    padding: 10px;
  }
`;

const fadeInText = keyframes`
from {
    opacity: 0
  }

  to {
    opacity: 1;
  }
`;

const FadeInAnimation = styled.span`
  animation: ${fadeInText} 2s;
`;
const WelcomeMessage = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
  margin-left: 23.5vw;
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-bottom: 10px;
    margin-left: 0;
    font-size: 3rem;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
}
`;

const ImageContainer = styled(Grid)`
  padding-right: 50px;
`;

const MainSection = () => {
  const [category, setCategory] = React.useState("CAREERS");
  return (
    <Wrapper component="div">
      <Grid container direction="row">
        <InputContainer item xs={12} sm={9} component="div">
          <WelcomeMessage variant="h1"><FadeInAnimation>Know your destination</FadeInAnimation></WelcomeMessage>
          <InputForm>
            Choose a category: &nbsp;
            <Select value={category} variant="outlined">
              <MenuItem value={"CAREERS"}>Jobs</MenuItem>
              <MenuItem value={"UNIVERSITIES"}>Universities</MenuItem>
              <MenuItem value={"COUNTRIES"}>Countries</MenuItem>
            </Select>
            &nbsp; FROM &nbsp;
            <TextField variant="outlined"></TextField>
            &nbsp;TO&nbsp;
            <TextField variant="outlined"></TextField>
            &nbsp;
            <Button variant="contained" size="large" disableElevation>
              GO
            </Button>
          </InputForm>
        </InputContainer>
        <ImageContainer item xs={12} sm={3}>
          <StyledImage src="/decision.png"></StyledImage>
        </ImageContainer>
      </Grid>
    </Wrapper>
  );
};

export default MainSection;
