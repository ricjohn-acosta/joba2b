import styled from "styled-components";
import dynamic from "next/dynamic";
import "../../../../public/editor.css";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";

const Wrapper = styled.div`
  min-height: 50vh;
  margin-top: 5vh;
  margin-left: 20%;
  margin-right: 20%;
`;

const Editor = dynamic(() => import("./Editor"), {
  loading: () => null,
  ssr: false,
});

const ShareStory = ({ editorState, setEditorState, toValue, fromValue }) => {
  return (
    <>
      <Subheaders icon={"/shareExperience.png"}>Share your story!</Subheaders>
      <hr/>
      <Wrapper>
        <Typography component="div" variant="h5">
          Share your experience transitioning from <b>{fromValue}</b> to{" "}
          <b>{toValue}</b>
        </Typography>
        <br />
        <Typography variant="subtitle2">
          The more detailed your story is the more impact you could make to
          someone's life 😊
        </Typography>
        <br />
        <Editor editorState={editorState} setEditorState={setEditorState} />
      </Wrapper>
    </>
  );
};

export default ShareStory;
