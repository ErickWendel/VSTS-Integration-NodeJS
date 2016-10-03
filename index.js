'use strict';
let vso = require('vso-client');
let bluebird = require('bluebird');
let client = vso.createClient(
    //url
    'https://callsystem.visualstudio.com/Call%20System',
    //colletion
    'DefaultCollection',
    //user
    'vso test',
    //pwd
    'nwmcgwwegqjko334g2bhlkrv4cxmpswiwqq6sji5baexhoorwr4a');

const wiql = 'Select [System.Id], [System.Title], [System.State] From WorkItems \
                order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc';

bluebird.promisifyAll(client);
let projetos = client.getProjectsAsync().then((projects) => {

    let id = projects[0].id;
    let name = projects[0].name;
    return { id, name };

});
projetos.then(project => {
    client.getProjectAsync(project.id, true).then((project1) => {
        console.log('project', project);
    });

    client.getTeamsAsync(project.id).then(teams => {
        console.log('teams', teams);
    });


    let workItemsIds = client.getWorkItemIdsAsync(wiql, project.name).then(ids => {
        console.log('getWorkItemIdsAsync', ids);
        return ids;
    });
    workItemsIds.then((ids) => {
        client.getWorkItemsByIdAsync(ids.join(','), null, null, null).then(ids2 => {
            console.log('getWorkItemsByIdAsync', ids2);
        });
        client.getWorkItemUpdateAsync(ids[0], 1).then(update => {
            console.log('getWorkItemUpdate', update);

        });
    });




});

