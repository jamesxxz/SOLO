enum APIError: Error {
    case responseProblem
    case decodingProblem
    case otherProblem(Error)
    case serverError
    case networkError(description: String)
       case unauthorized
       case forbidden
       case notFound

       static func fromStatusCode(_ statusCode: Int) -> APIError {
           switch statusCode {
           case 401:
               return .unauthorized
           case 403:
               return .forbidden
           case 404:
               return .notFound
           case 500...599:
               return .serverError
           default:
               return .responseProblem
           }
       }
   }

