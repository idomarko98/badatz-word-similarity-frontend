import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

interface props {
  similarWords: string[];
}

export function WordList({ similarWords }: props) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Search Results:
        </ListSubheader>
      }
    >
      {similarWords.map((word: string) => (
        <ListItemButton>
          <ListItemText primary={word} />
        </ListItemButton>
      ))}
    </List>
  );
}
