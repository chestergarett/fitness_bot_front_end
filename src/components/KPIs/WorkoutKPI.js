//material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
//icons
import { GiGymBag } from 'react-icons/gi';

const RootStyle = styled(Card)(() => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '1rem',
    color: 'rgb(4, 41, 122)',
    backgroundColor: 'rgb(208, 242, 255)',
    width: '16rem',
    marginRight: '1rem',
}));
  
  const IconWrapperStyle = styled('div')(() => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: '5rem',
    height: '5rem',
    justifyContent: 'center',
    marginBottom: '1rem',
    color: 'rgb(4, 41, 122)',
    backgroundImage: `linear-gradient(135deg, ${alpha('rgb(4, 41, 122)', 0)} 0%, ${alpha(
        'rgb(4, 41, 122)',
      0.24
    )} 100%)`
}));

const WorkoutKPI = (props) => {
    return (
        
        <RootStyle>
            <IconWrapperStyle>
                <GiGymBag style={{fontSize: '30px'}} />
            </IconWrapperStyle>
            <Typography variant="h3">{props.kpi}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                routines to date
            </Typography>
        </RootStyle>
        
    )
}

export default WorkoutKPI;