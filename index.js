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

        const release = await octokit.rest.repos.getRelease({
            owner: owner,
            repo: repo,
            release_id: releaseId
        });

        let desc = release.data.body;
        if (desc == null || typeof(desc) === 'undefined') {
            desc = "";
        }
        desc = desc.replace(/[\n\r\s]+$/,'');
        if (desc.length > 0) {
            desc += '\n\n';
        }
        desc += comment;

        console.log(`Updating description of release to the following:\n${desc}`);
        await octokit.rest.repos.updateRelease({
            owner: owner,
            repo: repo,
            release_id: releaseId,
            body: desc
        });
    } catch (error) {
        core.setFailed(error.message);
    }
})();
