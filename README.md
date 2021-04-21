# add-comment-to-release

Appends a comment to the description section of a GitHub release. Expects to be run as part of a workflow
triggered by the release. Will fail if it isn't because it reads the release id from the payload of the triggering
event.

Written in JavaScript, so it can be used by any runner type.

### Example usage

```yaml
- name: Upload
  uses: djn24/add-comment-to-release@v1
  with:
    token: ${{secrets.GITHUB_TOKEN}}
    path: |-
      First line of comment.
      Second line of comment.
      The description field of a GitHub release uses markdown so it can
      * have bulleted lists,
      * for example.
```
