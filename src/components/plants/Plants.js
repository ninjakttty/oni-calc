import React from 'react';
import { useContext } from '../../context';

// material
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import Plant from './Plant';

export default function Plants() {
  const classes = useStyles();
  const [{ plants }] = useContext();

  // handleRequestSort = id => {
  //   this.props.sortResources(id);
  // };

  const mapPlantsToElement = plants => {
    return plants.map((plant, i) => {
      return <Plant key={i} plant={plant} />;
    });
  };

  const getTableHeaders = () => {
    const tableHeaders = [
      { id: 'name', label: 'Resource', numeric: false },
      { id: 'quantity', label: 'Quantity', numeric: true },
    ];
    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          {tableHeaders.map(header => {
            return (
              <TableCell
                key={header.id}
                className={classes.tableCell}
                numeric={header.numeric}
              >
                <TableSortLabel
                // active={this.props.resourcesOrderBy === header.id}
                // direction={this.props.resourcesOrder}
                // onClick={() => this.handleRequestSort(header.id)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Plants</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table>
          {getTableHeaders()}
          <TableBody>{mapPlantsToElement(plants)}</TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const useStyles = makeStyles(theme => ({
  tableRow: {
    height: 'inherit',
  },
  tableCell: {
    padding: theme.spacing(),
  },
}));
