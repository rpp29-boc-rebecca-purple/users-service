# Instructions for creating a new service from the boilerplate

1. Open your terminal

2. Create a bare clone of the repository

```
  $ git clone --bare git@github.com:rpp29-boc-rebecca-purple/services_boilerplate.git
```

4. Make a new, empty repo in the organization
6. Mirror-push to the new repository

```
  $ cd services_boilerplate.git
  $ git push --mirror git@github.com:rpp29-boc-rebecca-purple/NEW_REPO_NAME.git
```

4. Remove the temporary local repository you created earlier

```
  $ cd ..
  $ rm -rf services_boilerplate.git
```

5. Clone the new repo, install npm packages, and complete work as normal

### CircleCI 

Build and test [![CircleCI](https://circleci.com/gh/rpp29-boc-rebecca-purple/users-service/tree/main.svg?style=svg)](https://circleci.com/gh/rpp29-boc-rebecca-purple/users-service/tree/main)

### Sonar Cloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_users-service&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_users-service)
