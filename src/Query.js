const githubQuery = (pageCount, queryString, paginationKeyword, paginationString) => {
  return {
    query: `
      {
        viewer {
          name
          repositories(first: 10) {
            nodes {
              name
              description
              id
              url
            }
          }
        }
        search(
          query: "${queryString} user:jessyavalos1615 sort:updated-desc"
          type: REPOSITORY
          ${paginationKeyword}: ${pageCount}, ${paginationString}
        ) {
          repositoryCount
          edges {
            cursor
            node {
              ... on Repository {
                name
                description
                id
                url
                viewerSubscription
                licenseInfo {
                  spdxId
                }
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `
  }
};

export default githubQuery;
