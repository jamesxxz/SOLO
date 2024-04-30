enum APIError: Error {
    case responseProblem
    case decodingProblem
    case otherProblem(Error)
}
