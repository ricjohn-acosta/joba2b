import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import StepNavigator from "./StepNavigator";
import {Controller, useForm} from "react-hook-form";
import React, {useState, useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {enableBeforeUnload} from "./utils/unsavedFormWarning";
import Select from "@material-ui/core/Select";

const Wrapper = styled.form`
  min-height: 50vh;
  margin: 5vh 0 2.5vh 2.5vw;
`;

const FormContainer = styled(Grid)`
  margin-top: 5vh;
`;

const Labels = styled(Grid)`
  display: flex;
  align-items: center;
  padding-left: 5vw;
  font-weight: bold;
`;

const PrivacyDetails = ({
                            source
                        }) => {
    const {register, watch, control, trigger, setValue, formState: {errors}} = useForm({mode: "all"});
    const fieldStore = watch()
    const privacyDetails = useSelector((state) => state.shareStory.privacyDetailsData)
    const userData = useSelector((state) => state.users.user)

    // const [hideEmail, setHideEmail] = React.useState(userData && userData.hide_email)

    useEffect(() => {
        console.log(userData)
        if (!userData) return
        console.log('USEEFFECT FIRED', userData)
        setValue('hideEmail', userData.hide_email)

    }, [userData])

    console.log('USER DATA', userData)
    console.log('privacy details', privacyDetails, fieldStore)
    return (
        <Wrapper>
            <Typography variant="h5">
                Hide your information when you share your experience in the experience
                section
            </Typography>

            <FormContainer container direction="column" spacing={4}>
                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide name? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideName"
                            control={control}
                            // defaultValue={false || (privacyDetails && privacyDetails.hideName)}
                            defaultValue={(userData && userData.hide_name) || (privacyDetails && privacyDetails.hideName) || false}

                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />

                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide email? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideEmail"
                            control={control}
                            defaultValue={(userData && userData.hide_email) || (privacyDetails && privacyDetails.hideEmail) || false}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide occupation? &nbsp;
                    </Labels>
                    <Controller
                        name="hideOccupation"
                        control={control}
                        defaultValue={(userData && userData.hide_location) || (privacyDetails && privacyDetails.hideOccupation) || false}
                        render={({field: {onChange, value}}) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                    color="default"
                                />
                            </>
                        )}
                    />
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide company? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideCompany"
                            control={control}
                            defaultValue={(userData && userData.hide_company) || (privacyDetails && privacyDetails.hideCompany) || false}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    <Labels item xs={6} sm={6} md={3}>
                        Hide location? &nbsp;
                    </Labels>
                    <Grid item xs={6} sm={6} md={2}>
                        <Controller
                            name="hideLocation"
                            control={control}
                            defaultValue={(userData && userData.hide_location || (privacyDetails && privacyDetails.hideLocation) || false)}
                            render={({field: {onChange, value}}) => (
                                <>
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color="default"
                                    />
                                </>
                            )}
                        />
                    </Grid>
                </Grid>
            </FormContainer>
            {console.log('source', source)}
            <StepNavigator fieldData={Object.keys(fieldStore).length === 0 ? privacyDetails : fieldStore}
                           needsValidation={false}
                           source={source}
            />
        </Wrapper>
    );
};

export default PrivacyDetails;
