/*
Organization or department is the business entity in which a given user works
example: Finance, Human Resource, Sales, etc.
We can have several organizations with same name, located at different locations.
Each organization must have a different Id to differentiate it from other organization.
the Head is the person with highest responability: The Director, VP, etc.
We can identify additional key people in an organization to help facilitate contacts
*/

import { User } from '../users/user';

export interface Contact {
  contactName: string;
  contactEmail: string;
}

export class Organization {
  _id: string;
  name: string;
  id: string;
  head: User;
  contacts: User[]; /*should be a list of users */
}
