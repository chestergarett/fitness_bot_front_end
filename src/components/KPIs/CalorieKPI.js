//material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
//icons
import { GiHamburger } from 'react-icons/gi';

const RootStyle = styled(Card)(() => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '1rem',
    color: 'rgb(0, 82, 73)',
    backgroundColor: 'rgb(200, 250, 205)',
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
    color: 'rgb(0, 82, 73)',
    backgroundImage: `linear-gradient(135deg, ${alpha('rgb(0, 82, 73)', 0)} 0%, ${alpha(
        'rgb(0, 82, 73)',
      0.24
    )} 100%)`
}));

const CalorieKPI = (props) => {
    return (
        
        <RootStyle>
            <IconWrapperStyle>
                <GiHamburger style={{fontSize: '30px'}} />
            </IconWrapperStyle>
            <Typography variant="h3">{parseFloat(props.kpi).toFixed(2)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                calorie intake
            </Typography>
        </RootStyle>
        
    )
}

export default CalorieKPI;