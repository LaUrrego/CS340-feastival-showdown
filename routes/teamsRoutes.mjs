import express from 'express';
import * as teamsController from '../controllers/teamsController.mjs';

// Initialize teams router
const teamsRoutes = express.Router();

// Define teams routes
teamsRoutes
    .get('/', teamsController.getTeamsTable)
    .get('/new-team', teamsController.getNewTeamForm)
    .get('/edit-team', teamsController.getEditTeamForm)
    .post('/new-team-ajax', teamsController.addTeam)
    .put('/edit-team-ajax', teamsController.updateTeam)
    .delete('/delete-team-ajax', teamsController.deleteTeam)

export { teamsRoutes };