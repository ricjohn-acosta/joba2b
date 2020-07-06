import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { rateExperience } from "../../../../store/actions/ratings";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

const Wrapper = styled.div`
  min-height: 25vh;
  background-color: white;
  padding-top: 5vh;
`;

const ProfileContainer = styled(Grid)`
  margin-top: 5vh;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  margin-left: 2.5%;
  color: grey;
`;

const ChipsContainer = styled.div`
  padding-top: 10px;
`;
const Content = styled(Grid)`
  margin-top: 2.5vh;
`;

const ButtonGroup = styled.div`
  float: right;
`;

const HelpfulCount = styled(Typography)`
  color: grey;
`;

const StyledHr = styled.hr`
  margin-top: 5vh;
  border: 0;
  height: 1px;
  background: #e0e0e0;
`;



const Experience = ({
  experience,
  experienceId,
  name,
  company,
  position,
  email,
  bio,
  fulfillment,
  easeOfTransition,
  regret,
  helpfulCount,
  date_posted,
  rateExperience,
  isRated,
  handleOptions,
  setCurrentId,
}) => {
  const [session, loading] = useSession();
  const [rated, setRated] = React.useState(false);


  const handleRating = (e) => {
    rateExperience({
      user_id: session.account.id,
      experience_id: experienceId,
      is_helpful: e.currentTarget.value === "true" ? true : false,
      date_liked: Date.now(),
    });
    setRated(true);
  };


  const renderChips = () => {
    const chips = [fulfillment, easeOfTransition, regret];

    console.log(chips);
    return chips.map((e, i) => (
      <>
        <Chip label={e} color={checkColor(i)} />
        &nbsp;
      </>
    ));
  };

  const checkColor = (index) => {
    if (index === 0) {
      return "secondary";
    }

    if (index === 1) {
      return "primary";
    }

    if (index === 2) {
      return "default";
    }
  };

  const isWhiteSpaceOrEmpty = (input) => {
    return !/[^\s]/.test(input);
  };

  return (
    <Wrapper>
      <Grid container drection="column">
        <ProfileContainer item xs={12} sm={6} md={12}>
          <div style={{ float: "right" }}>
            <IconButton onClick={(e) => {handleOptions(e);setCurrentId(experienceId.toString())}}>
              <MoreVertIcon />
            </IconButton>
          </div>
          <ProfileDetails>
            <Avatar style={{ marginTop: "5px" }} />
            <UserInfo>
              <div style={{ display: "flex" }}>
                <PersonIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{name}
              </div>
              <div style={{ display: "flex" }}>
                <EmailIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{email}
              </div>
              {isWhiteSpaceOrEmpty(position) ||
                (isWhiteSpaceOrEmpty(company) && (
                  <div style={{ display: "flex" }}>
                    <WorkIcon style={{ color: "#1a8cff" }} fontSize="small" />
                    &nbsp;{position + "at" + company}
                  </div>
                ))}
              <div style={{ display: "flex" }}>
                <ChatBubbleIcon style={{ color: "#1a8cff" }} fontSize="small" />
                &nbsp;{bio}
              </div>
            </UserInfo>
          </ProfileDetails>
          <div>Posted at {moment(date_posted).format("DD MMM YYYY")}</div>
          <ChipsContainer>{renderChips()}</ChipsContainer>
        </ProfileContainer>
        <Content item xs={12} sm={6} md={12}>
          {experience}
          <StyledHr />
          <HelpfulCount component="span" variant="caption">
            {helpfulCount} people have found this helpful
          </HelpfulCount>
          {console.log(isRated)}
          {isRated || rated ? (
            <div style={{ float: "right" }}>Thanks for rating!</div>
          ) : (
            <ButtonGroup>
              <Button value="true" onClick={handleRating}>
                Helpful
              </Button>
              <Button value="false" onClick={handleRating}>
                Not helpful
              </Button>
            </ButtonGroup>
          )}
        </Content>
      </Grid>
      {/* <Popper
        open={open && experienceId.toString() === currentExperienceId ? true : false}
        anchorEl={anchorEl}
      >
        <PopperContent>The content of the Popper.</PopperContent>
      </Popper> */}
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    rateExperience: (rating) => dispatch(rateExperience(rating)),
  };
};

export default connect(null, mapDispatchToProps)(Experience);
