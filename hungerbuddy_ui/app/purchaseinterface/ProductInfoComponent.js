"use client"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
 
export default function ProductInfoComponent({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    // ✅ FIX: removed marginLeft:"59%"/-46 hack. This component now just
    // fills 100% of whatever column its parent grid/flex gives it.
    <div style={{ width: "100%", padding: matches ? "20px" : "0", boxSizing: "border-box" }}>
 
      <Accordion style={{ background: 'transparent', boxShadow: 'none', border: 'none', borderTop: '1px solid #cebdd8ff' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span" style={{ fontSize: matches ? "16px" : "18px", fontFamily: 'poppins', fontWeight: 400 }}>
            Ingredients list
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingLeft: 0 }}>
          {data?.ingredients}
        </AccordionDetails>
      </Accordion>
 
      <Accordion style={{ background: 'transparent', boxShadow: 'none', border: 'none', borderTop: '1px solid #cebdd8ff' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
          <Typography component="span" style={{ fontSize: matches ? "16px" : "18px", fontFamily: 'poppins', fontWeight: 400 }}>
            Share
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingLeft: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 10 }}>
            <img style={{ width: '20px', height: '20px' }} src={'/images/linkedin-sign.png'} alt="linkedin" />
            <img style={{ width: '20px', height: '20px' }} src={'/images/social.png'} alt="social" />
            <img style={{ width: '20px', height: '20px' }} src={'/images/facebook.png'} alt="facebook" />
            <img style={{ width: '20px', height: '20px' }} src={'/images/instagram.png'} alt="instagram" />
            <img style={{ width: '20px', height: '20px' }} src={'/images/pinterest-logo.png'} alt="pinterest" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
