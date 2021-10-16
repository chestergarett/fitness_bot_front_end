const CalorieDashboard = () => {
    return (
        <RootStyle>
        <IconWrapperStyle>
            <Icon icon={bugFilled} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Bug Reports
        </Typography>
        </RootStyle>
    )
}