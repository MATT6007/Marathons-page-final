import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useAuth } from '../../contexts/AuthContext';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Sidebar(props) {
  const { archives, description, title } = props;
  const {isLogged} = useAuth()

  return (
    <Grid 
      item xs={6} md={4} 
      container
      direction="column"
      justifyContent="flex-start"
    >
    
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', border: '2px solid #000', color: '#000' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Paper>

      
      <Typography variant="h6" gutterBottom sx={{ mt: 3, background: '#c1f3c1', p: 2, border: '2px solid #000080', textAlign: 'center', color: '#000080', fontWeight: 'bold' }}>
        Competition list
      </Typography>

      {isLogged ? ( <>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '2px solid #000080', margin: '20px 0', background: 'white' }}>
          <tbody>
            {archives.slice(0, 8).map((archive) => (
              <tr key={archive.ID_competition} style={{ borderBottom: '2px solid #000080' }}>
                <td>
                  <Link display="block" variant="body1" href={archive.url} style={{ color: '#000', fontWeight: 'bold', marginLeft: '20px', marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                    {archive.title}
                    <img src={archive.image} alt='' style={{ marginLeft: 'auto', display: 'block', maxWidth: '80px', maxHeight: '80px', alignSelf: 'center' }} />
                  </Link>
                  <Typography
                    variant="caption"
                    color="primary"
                    style={{ display: 'inline-block', marginLeft: '20px', marginRight: '20px', fontSize: '1.0rem' }}
                  >
                    {archive.date}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </>) : (
            <>
            <Typography
              variant="body1"
              style={{
                margin: '20px',
                padding: '15px',
                background: '#FFA500', 
                color: '#000', 
                border: '2px solid #000', 
                borderRadius: '8px',
              }}
            >
                To unlock competition, please log in.
               
            </Typography>
           <LockOpenIcon style={{ fontSize: '76px', color: '#000', margin:'auto', marginTop: '2px' }} />
            </>
          )}
        </Grid>
        
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
