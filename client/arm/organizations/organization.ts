/*
Organization or department is the business entity in which a given user works
example: Finance, Human Resource, Sales, etc.
We can have several organizations with same name, located at different locations.
Each organization must have a different Id to differentiate it from other organization.
the Head is the person with highest responability: The Director, VP, etc.
*/

export class Organization {
  //_id: string;
  name: string;
  id: string;  
  head: string;
}
