interface CredentialResponse {
  data: {
    user: {
      email: string
      name: string
    }
  }
}

export function getAuthCredentials(email: string): CredentialResponse {
  let data: CredentialResponse = { data: { user: { email: "", name: "" } } }

  const query = gql`
    query ($email: String!) {
      user(email: $email) {
        email
        name
      }
    }
  `
  const variables = { email: email }
  const { onResult, onError } = useQuery<CredentialResponse>(query, variables)

  onResult((result) => {
    data = result.data
  })

  onError((error) => {
    console.error(error)
  })

  return data
}
