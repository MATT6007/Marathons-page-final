import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
};

const RegistrationForm = ({ marathonId, handleRegistration, handleClose }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const validationSchema = Yup.object({
        iceFirstName: Yup.string().required('ICE first name is required'),
        iceLastName: Yup.string().required('ICE last name is required'),
        icePhone: Yup.string().required('ICE phone number is required'),
    });

    const formik = useFormik({
        initialValues: {
            iceFirstName: '',
            iceLastName: '',
            icePhone: '',
        },
        validationSchema,
        onSubmit: async () => {
            try {
                const registrationResponse = await handleRegistration(formik.values, marathonId, false);
                
                if (registrationResponse.ok) {
                    setRegistrationStatus('success');
                } else if (registrationResponse.status === 404) {
                    setRegistrationStatus('not_found');
                } else if (registrationResponse.status === 400) {
                    setRegistrationStatus('already_registered');
                } else {
                    setRegistrationStatus('error');
                }
                
                setOpenDialog(true);
            } catch (error) {
                setRegistrationStatus('error');
                setOpenDialog(true);
            }
        },
    });

    const handlePaymentSimulation = async () => {
        try {
            setRegistrationStatus('success_payment');
        } catch (error) {
            setRegistrationStatus('error');
        } finally {
            setPaymentDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        if (!paymentDialogOpen) {
            setOpenDialog(false);
            setRegistrationStatus(null);
        }
        handleClose();
    };

    const handlePaymentDialogClose = () => {
        setPaymentDialogOpen(false);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="iceFirstName"
                            name="iceFirstName"
                            label="First name of your ICE"
                            variant="outlined"
                            value={formik.values.iceFirstName}
                            onChange={formik.handleChange}
                            error={formik.touched.iceFirstName && Boolean(formik.errors.iceFirstName)}
                            helperText={formik.touched.iceFirstName && formik.errors.iceFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="iceLastName"
                            name="iceLastName"
                            label="Last name of your ICE"
                            variant="outlined"
                            value={formik.values.iceLastName}
                            onChange={formik.handleChange}
                            error={formik.touched.iceLastName && Boolean(formik.errors.iceLastName)}
                            helperText={formik.touched.iceLastName && formik.errors.iceLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="icePhone"
                            name="icePhone"
                            label="ICE Phone number"
                            variant="outlined"
                            value={formik.values.icePhone}
                            onChange={formik.handleChange}
                            error={formik.touched.icePhone && Boolean(formik.errors.icePhone)}
                            helperText={formik.touched.icePhone && formik.errors.icePhone}
                        />
                    </Grid>
                </Grid>

                <Box mt={2} style={buttonContainerStyle}>
                    <Button type="submit" variant="contained" color="primary">
                        Zapisz się na bieg
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handlePaymentSimulation}>
                        Symuluj płatność
                    </Button>
                </Box>
            </form>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {registrationStatus === 'success'
                        ? 'Registered for the competition!'
                        : registrationStatus === 'not_found'
                        ? 'Error: Competition not found'
                        : registrationStatus === 'already_registered'
                        ? 'Error: Runner already registered for the competiiton'
                        : registrationStatus === 'success_payment'
                        ? 'Payment status'
                        : 'Error during registration for the competition'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {registrationStatus === 'success_payment'
                            ? 'Simulation of the payment process gone properly.'
                            : registrationStatus === 'success'
                            ? 'Registration has gone properly for this competition.'
                            : registrationStatus === 'not_found'
                            ? 'Competition not found. Please check ID competition'
                            : registrationStatus === 'already_registered'
                            ? 'Runner is already registered for the competition.'
                            : 'Error during registration for the competition. Please try later'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={paymentDialogOpen} onClose={handlePaymentDialogClose}>
                <DialogTitle>Informacja o płatności</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here additional information about payment process.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePaymentDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RegistrationForm;
