"use client"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ProductInfoComponent() { 
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    
    return (
        <div style={{
            display: 'flex',
            width: matches ? "100%" : "40%",
            marginLeft: matches ? -46 : "59%",
            marginTop: matches ? -50 : 40,
            padding: matches ? "20px" : "0",
            justifyContent: matches ? "center" : "flex-start"
        }}>
            <div style={{ 
                width: matches ? "100%" : "100%",
                maxWidth: matches ? "500px" : "100%"
            }}>
                
                <Accordion style={{ 
                    background: 'transparent',
                    boxShadow: 'none',
                    border: 'none'
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      
                    >
                        <Typography component="span" style={{
                            display: 'flex',
                            fontSize: matches ? "16px" : "18px",
                            fontFamily: 'poppins',
                            fontWeight: 400
                        }}>
                            Ingredients list
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ paddingLeft: 0 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex.
                    </AccordionDetails>
                </Accordion>

                
                <Divider style={{ 
                    marginTop: matches ? 20 : 30,
                    backgroundColor: "#cebdd8ff",
                    width: matches ? "93%" : "40%",
                    position:'absolute'
                }} />

            
                <div style={{ marginTop: matches ? "4%" : "5%" }}>
                    <Accordion style={{ 
                        background: 'transparent',
                        boxShadow: 'none',
                        border: 'none'
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span" style={{
                                display: 'flex',
                                fontSize: matches ? "16px" : "18px",
                                fontFamily: 'poppins',
                                fontWeight: 400
                            }}>
                                Nutrition labeling / 100g
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ paddingLeft: 0 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex.
                        </AccordionDetails>
                    </Accordion>
                </div>

            
               <Divider style={{ 
                    marginTop: matches ? 20 : 30,
                    backgroundColor: "#cebdd8ff",
                    width: matches ? "93%" : "40%",
                    position:'absolute'
                }} />


                <div style={{ marginTop: matches ? "4%" : "5%" }}>
                    <Accordion style={{ 
                        background: 'transparent',
                        boxShadow: 'none',
                        border: 'none'
                    }}>
                        <AccordionSummary
                        
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <Typography component="span" style={{
                                display: 'flex',
                                fontSize: matches ? "16px" : "18px",
                                fontFamily: 'poppins',
                                fontWeight: 400
                            }}>
                                Share
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ paddingLeft: 0 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}