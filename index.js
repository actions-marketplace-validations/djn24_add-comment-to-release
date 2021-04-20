const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
    try {
        const token = core.getInput('token');
        const octokit = github.getOctokit(token);

        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
        const comment = core.getInput('comment');

        const eventName = github.context.eventName;
        if (eventName !== 'release') {
            core.setFailed(`Should be run by a release event but event name = ${eventName}`);
        }
        const releaseId = github.context.payload.release.id;

        console.log(comment);

    } catch (error) {
        core.setFailed(error.message);
    }
})();
