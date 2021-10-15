//material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
//icons
import { GiMultipleTargets } from 'react-icons/gi';

const RootStyle = styled(Card)(() => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '1rem',
    color: 'rgb(122, 79, 1)',
    backgroundColor: 'rgb(255, 247, 205)',
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
    color: 'rgb(183, 129, 3)',
    backgroundImage: `linear-gradient(135deg, ${alpha('rgb(122, 12, 46)', 0)} 0%, ${alpha(
        'rgb(122, 12, 46)',
      0.24
    )} 100%)`
}));

const TargetKPI = () => {
    return (
        
        <RootStyle>
            <IconWrapperStyle>
                <GiMultipleTargets style={{fontSize: '30px'}} />
            </IconWrapperStyle>
            <Typography variant="h3">55 <Typography variant="caption">lbs</Typography> </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                target weight
            </Typography>
        </RootStyle>
        
    )
}

export default TargetKPI;