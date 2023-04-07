// theme.ts
import { createTheme } from "@mui/material/styles";

const MuiTheme = createTheme({
	palette: {
      primary: {
        main: "#706DFF",
        // light: main값을 통해 계산됨
  	    // dark: main값을 통해 계산됨
        // contrastText: main값을 통해 계산됨
      },
      secondary: {
        main: "#FF5DE5"
      }
    }
});

export default MuiTheme;