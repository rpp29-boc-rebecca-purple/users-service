# Instructions for creating a new service from the boilerplate

1. Open your terminal

2. Create a bare clone of the repository

```
  $ git clone --bare git@github.com:rpp29-boc-rebecca-purple/services_boilerplate.git
```

4. Make a new, empty repo in the organization
6. Mirror-push to the new repository

```
  $ cd services_boilerplate
  $ git push --mirror git@github.com:rpp29-boc-rebecca-purple/NEW_REPO_NAME.git
```

4. Remove the temporary local repository you created earlier

```
  $ cd ..
  $ rm -rf services_boilerplate
```

5. Clone the new repo, install npm packages, and complete work as normal
