

## Commit Guide

Throughout this document, the term __"author"__ refers to the individual who made a given commit.
This is important for any developer looking to contribute to this wack project.

*PRs* where one or more commits fail to comply with the definitions specified in this documentation,
especially those marked with the *"MUST"* keyword, will be rejected with a feedback.

All commits MUST follow the syntax : 

```
<message> @@@ <contributor__username>
```
where 

- message: Is the commit message and *MUST* be between 0 and 1024 characters in length. If the author does 
           not intend to add a commit message, He/She *MUST* set the message field to `0`.

- contributer__username: Is the author's github username.
