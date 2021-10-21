# Instructions for creating a new service from the boilerplate

1. Open your terminal

2. Create a bare clone of the repository

```
  $ git clone --bare git@github.com:rpp29-boc-rebecca-purple/services_boilerplate.git
```

3. Mirror-push to the new repository

```
  $ cd services_boilerplate
  $ git push --mirror https://github.com/exampleuser/NEW_SERVICE_REPO_NAME.git
```

4. Remove the temporary local repository you created earlier

```
  $ cd ..
  $ rm -rf services_boilerplate
```

5. Clone the new repo, install npm packages, and complete work as normal