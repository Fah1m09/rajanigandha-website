import { Box, Grid } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer>
      <Box bgcolor="palette.primary">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p className="footerCopyright">Copyright @ 2022 Rajanigandha International</p>
            </Grid>
          </Grid>
      </Box>
    </footer>
  )
}
