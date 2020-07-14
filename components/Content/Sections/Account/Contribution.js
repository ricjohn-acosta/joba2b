import styled, { keyframes } from "styled-components";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import ContributionExperienceModal from "./ContributionExperienceModal";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import { deleteExperience } from "../../../../store/actions/experiences";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled(Paper)``;
const RightGrid = styled(Grid)`
  text-align: right;
  background-color: #f0f0f0;
`;

const LeftGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Transition = styled(Typography)`
  font-size: large;

  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1em;
  }
`;

const ContributionDetails = styled.div`
  padding: 2.5%;
`;

const ButtonContainer = styled.div`
  display: flex;
  float: right;
  padding: 5px;
`;

const Contribution = ({
  experienceId,
  from,
  to,
  story,
  datePosted,
  helpfulRating,
  contributions,
  setContributions,
  deleteExperience,
}) => {
  const [modalView, setModalView] = React.useState(false);
  const [dialogView, setDialogView] = React.useState(false);
  const [storyPreview, setStoryPreview] = React.useState(
    htmlToReactParser.parse(draftToHtml(JSON.parse(story)))
  );

  const handleView = () => {
    setModalView(true);
  };

  const handleDialogOpen = () => {
    setDialogView(true);
  };

  const handleDialogClose = () => {
    setDialogView(false);
  };

  const handleDelete = (id) => {
    setContributions(
      contributions.filter((experience) => experience.experience_id !== id)
    );
    console.log(id);
    deleteExperience({ experience_id: id });
  };

  return (
    <Wrapper variant="outlined">
      <Grid container direction="row">
        <LeftGrid item xs={12} sm={7}>
          <Transition variant="h5">
            {from} <ArrowForwardIcon fontSize="small" /> {to}{" "}
          </Transition>
        </LeftGrid>
        <RightGrid item xs={12} sm={5}>
          <ContributionDetails>
            <Typography variant="body2">
              {moment(datePosted).format("DD MMM YYYY")}
            </Typography>
            <Typography variant="body2">
              <b>{helpfulRating}</b> {helpfulRating === 1 ? "user" : "users"}{" "}
              found this helpful
            </Typography>
            <br />
            <ButtonContainer>
              <Button
                color="primary"
                variant="contained"
                size="small"
                disableElevation
                // onClick={() => handleDelete(experienceId)}
                onClick={handleDialogOpen}
              >
                Delete
              </Button>
              &nbsp;
              <Button
                color="primary"
                variant="contained"
                size="small"
                disableElevation
                onClick={handleView}
              >
                VIEW
              </Button>
            </ButtonContainer>
          </ContributionDetails>
        </RightGrid>
      </Grid>
      <ContributionExperienceModal
        experienceId={experienceId}
        modalView={modalView}
        setModalView={setModalView}
        storyPreview={storyPreview}
        setStoryPreview={setStoryPreview}
        rawStoryPreview={story}
      />
      <Dialog onClose={handleDialogClose} open={dialogView}>
        <DialogTitle>Confirm story deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this story?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(experienceId)}>Delete</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExperience: (experienceId) =>
      dispatch(deleteExperience(experienceId)),
  };
};

export default connect(null, mapDispatchToProps)(Contribution);
