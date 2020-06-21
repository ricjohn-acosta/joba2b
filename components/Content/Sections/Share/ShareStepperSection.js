import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ChooseCategory from "./ChooseCategory";
import ShareStory from "./ShareStory";
import Preview from "./ExtraInformation";
import StepConnector from "@material-ui/core/StepConnector";
import { careersCategory } from "../../../../lib/categories";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import { grey } from "@material-ui/core/colors";
import { addExperience } from "../../../../store/actions/experiences";
import draftToHtml from "draftjs-to-html";
import ExtraInformation from "./ExtraInformation";

// OVERRIDING DEFAULT MATERIAL-UI STYLING
const StyledConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#00CCFF",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#00CCFF",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: grey,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// COMPONENT LEVEL STYLING
const Wrapper = styled.div`
  min-height: 110vh;
  margin-top: 5vh;
  padding: 0 5% 0 5%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(211, 252, 252, 1) 100%
  );
  overflow: auto;
`;

function getSteps() {
  return [
    "What transition would you like to talk about?",
    "Share your story!",
    "Extra information",
  ];
}
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const ShareStepperSection = ({ addExperience, session }) => {
  const classes = useStyles();
  const [categories, setCategory] = React.useState(careersCategory);
  const [currentCategory, setCurrentCategory] = React.useState("careers");
  const [toValue, setToValue] = React.useState(null);
  const [toInputValue, setToInputValue] = React.useState("");
  const [fromValue, setFromValue] = React.useState(null);
  const [fromInputValue, setFromInputValue] = React.useState("");
  const [isSelected, setSelected] = React.useState(false);
  const [isSwapping, setSwapping] = React.useState(false);
  const [isEmptyField, setEmptyFields] = React.useState(false);
  const [fulfillment, setFulfillment] = React.useState("");
  const [easeOfTransition, setEaseOfTransition] = React.useState("");
  const [regret, setRegret] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editorContent = convertToRaw(editorState.getCurrentContent());
  const story = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  console.log("STORY ", editorContent);
  const steps = getSteps();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ChooseCategory
            categories={categories}
            setCategory={setCategory}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            setToValue={setToValue}
            setToInputValue={setToInputValue}
            setFromValue={setFromValue}
            setFromInputValue={setFromInputValue}
            setSelected={setSelected}
            setSwapping={setSwapping}
            toValue={toValue}
            toInputValue={toInputValue}
            fromValue={fromValue}
            fromInputValue={fromInputValue}
            isSwapping={isSwapping}
            isEmptyField={isEmptyField}
            setEmptyFields={setEmptyFields}
          />
        );
      case 1:
        return (
          <ShareStory
            editorState={editorState}
            setEditorState={setEditorState}
            toValue={toInputValue}
            fromValue={fromInputValue}
          />
        );
      case 2:
        return (
          <ExtraInformation
            editorState={editorState}
            setFulfillment={setFulfillment}
            fulfillment={fulfillment}
            setEaseOfTransition={setEaseOfTransition}
            easeOfTransition={easeOfTransition}
            setRegret={setRegret}
            regret={regret}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience({
      eid: session.user.uid,
      category: currentCategory,
      from: fromInputValue,
      to: toInputValue,
      fulfillment,
      ease_of_transition: easeOfTransition,
      regret,
      story,
    });
  };

  const handleNext = () => {
    if (checkIfEmpty(0) && activeStep === 0) {
      return;
    } else if (checkIfEmpty(1) && activeStep === 1) {
      return;
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const checkIfEmpty = (step) => {
    switch (step) {
      case 0:
        if (!toValue || !fromValue) {
          setEmptyFields(true);
          return true;
        } else {
          setEmptyFields(false);

          return false;
        }

      case 1:
        if (
          editorContent.blocks[0].text === "" &&
          editorContent.blocks.length === 1
        ) {
          return true;
        } else {
          return false;
        }
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Wrapper>
      {/* {console.log("TO VALUE, ", toValue, toInputValue)}
      {console.log("FROM VALUE, ", fromValue, fromInputValue)}
      {console.log(story)}
      {console.log(editorContent.blocks[0].text)} */}
      {console.log(fulfillment, easeOfTransition, regret)}
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<StyledConnector />}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                All done! Thanks for contributing.
              </div>
              <Button
                color="primary"
                variant="contained"
                style={{ float: "right" }}
                onClick={handleSubmit}
                className={classes.button}
              >
                Submit
              </Button>
              <Button
                style={{ float: "right" }}
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div
                // style={{ display: "flex", justifyContent: "center" }}
                className={classes.instructions}
              >
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                </Button>
                <Button
                  style={{ float: "right" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExperience: (experience) => dispatch(addExperience(experience)),
  };
};

export default connect(null, mapDispatchToProps)(ShareStepperSection);
