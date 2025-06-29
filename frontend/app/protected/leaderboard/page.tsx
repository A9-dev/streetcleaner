import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Chip, Grid, Card, CardContent } from "@mui/material";

const leaderboardData = [
  { name: "Alice", lastMonth: 500, total: 2500, team: "red" },
  { name: "Bob", lastMonth: 450, total: 2300, team: "blue" },
  { name: "Charlie", lastMonth: 400, total: 2600, team: "white" },
  { name: "David", lastMonth: 350, total: 2100, team: "red" },
  { name: "Eve", lastMonth: 300, total: 2800, team: "blue" },
  { name: "Frank", lastMonth: 250, total: 1900, team: "white" },
  { name: "Grace", lastMonth: 200, total: 2200, team: "red" },
  { name: "Heidi", lastMonth: 150, total: 2400, team: "blue" },
  { name: "Ivan", lastMonth: 100, total: 2000, team: "white" },
  { name: "Judy", lastMonth: 50, total: 2700, team: "red" },
].sort((a, b) => b.lastMonth - a.lastMonth);

const getTeamChip = (team: string) => {
  let color: "error" | "info" | "default" = "default";
  if (team === "red") color = "error";
  if (team === "blue") color = "info";

  return <Chip label={team.charAt(0).toUpperCase() + team.slice(1)} color={color} size="small" />;
};

const TeamStats = () => {
  const teams = ["red", "white", "blue"];
  const teamStats = teams.map(team => {
    const teamMembers = leaderboardData.filter(d => d.team === team);
    const totalPoints = teamMembers.reduce((acc, member) => acc + member.total, 0);
    const lastMonthPoints = teamMembers.reduce((acc, member) => acc + member.lastMonth, 0);
    return { name: team, totalPoints, lastMonthPoints };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  const getTeamCardStyle = (team: string) => {
    let backgroundColor = "#ffffff";
    let color = "#000";
    if (team === "red") {
      backgroundColor = "rgba(255, 205, 210, 0.7)";
      color = "#c62828";
    }
    if (team === "blue") {
      backgroundColor = "rgba(187, 222, 251, 0.7)";
      color = "#1565c0";
    }
    if (team === "white") {
        backgroundColor = "rgba(245, 245, 245, 0.7)";
        color = "#424242";
    }
    return { backgroundColor, color, border: `1px solid ${color}`, height: '100%' };
  };

  return (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Team Standings
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamStats.map((team, index) => (
          <Grid item xs={12} md={3} key={team.name} sx={{ display: 'flex' }}>
            <Card elevation={4} sx={{ ...getTeamCardStyle(team.name), borderRadius: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                  Team {team.name.charAt(0).toUpperCase() + team.name.slice(1)}
                </Typography>
                <Typography variant="body1">Total Points: {team.totalPoints}</Typography>
                <Typography variant="body1">Points This Month: {team.lastMonthPoints}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Rank: #{index + 1}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default function LeaderboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Leaderboard
      </Typography>
      <Paper elevation={3}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Points (Last Month)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Points (Total)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? "action.hover" : "background.paper"
                   }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.lastMonth}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">{getTeamChip(row.team)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TeamStats />
    </Box>
  );
}