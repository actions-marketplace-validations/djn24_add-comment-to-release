# add-comment-to-release

Appends a comment to the description section of a GitHub release. Expects to be run as part of a workflow
triggered by the release. Will fail if it isn't because it reads the release id from the payload of the triggering
event.

Written in JavaScript, so it can be used by any runner type.

Appending a comment is done by reading the existing description and then writing an updated description.
The two REST API calls happen in quick succession however there is the potential for a race condition.
For example, if two different workflows triggered from the same release both use this action to append a
comment, and both reach the stage where they are modifying the comment at the same time, one could end up
overwriting the change made by the other.

### Example usage

```yaml
- name: Upload
  uses: djn24/add-comment-to-release@v1
  with:
    token: ${{secrets.GITHUB_TOKEN}}
    comment: |-
      First line of comment.
      Second line of comment.
      The description field of a GitHub release uses markdown so it can
      * have bulleted lists,
      * for example.
```
