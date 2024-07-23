import { PrimeIcons } from "primereact/api";
import React from "react";

export const currencies = ["USD", "EUR"];
export const themz = [
  { name: "light", icon: <i className={`${PrimeIcons.SUN} light-th-ico`}></i> },
  { name: "dark", icon: <i className={`${PrimeIcons.MOON} dark-th-ico`}></i> },
];
export const timezn = [
  "-12",
  "-11",
  "-10",
  "-9",
  "-8",
  "-7",
  "-6",
  "-5",
  "-4",
  "-3",
  "-2",
  "-1",
  "0",
  "+1",
  "+2",
  "+3",
  "+4",
  "+5",
  "+6",
  "+7",
  "+8",
  "+9",
  "+10",
  "+11",
  "+12",
];

export const userdata = {
  name: "Ecore User",
  phone: "081123456789",
  email: "ecorewalletuser@ecore.com",
};

export const tickets = {
  13466: {
    id: "13466",
    date: new Date(1720689428225),
    subject: "I can't log in.. why!!",
    category: "Log In ",
    status: "Pending",
    cs: { name: "Minato kun", role: "Ecore CS. Specialist" },
    history: [],
  },
  34566: {
    id: "34566",
    date: new Date(1720699428225),
    subject:
      "My money has been pendng for 3232323 days why whygfgfgfgfgfgfgfgfg!!",
    category: "Withdrawal ",
    division: "Withdrawal",
    status: "Processing",
    txid: "34343435676767676767",
    cs: { name: "Pumba", role: "Ecore CS. Specialist" },
    history: [
      {
        isAgent: false,
        message:
          "Hello, The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes.  Once we implement it we will inform you.Best regards",
        date: new Date(1720669328225),
        writer: "Ecore User",
        attachments: [],
      },
      {
        isAgent: true,
        message:
          "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
        date: new Date(1720679328225),
        writer: "Ecore Support",
        attachments: [],
      },
      {
        isAgent: false,
        message:
          "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
        date: new Date(1720679428225),
        writer: "Ecore User",
        attachments: [],
      },
      {
        isAgent: true,
        message:
          "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
        date: new Date(1720699428225),
        writer: "Ecore User",
        attachments: [],
      },
    ],
  },
  44566: {
    id: "44566",
    date: new Date(),
    subject: "Pending Withdrawal!!",
    category: "Withdrawal ",
    status: "Resolved",
    txid: "34343435676767676767",
    cs: { name: "Julie", role: "Ecore CS. Specialist" },
    history: [],
  },
};

/**Loads Ticket History/Messages from Database or Wherever using the ticket Number */

export const ticketHistory = [
  {
    isAgent: false,
    message:
      "Hello, The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes.  Once we implement it we will inform you.Best regards",
    date: new Date(1720669328225),
    writer: "Ecore User",
    attachments: [],
  },
  {
    isAgent: true,
    message:
      "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
    date: new Date(1720679328225),
    writer: "Ecore Support",
    attachments: [],
  },
  {
    isAgent: false,
    message:
      "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
    date: new Date(1720679428225),
    writer: "Ecore User",
    attachments: [],
  },
  {
    isAgent: true,
    message:
      "Hello Ezekiel,The Volet payment method is still in configuration and we have not yet launched it. It was visible for a few minutes. Once we implement it we will inform you.Best regards",
    date: new Date(1720699428225),
    writer: "Ecore User",
    attachments: [],
  },
];

/**TICKET VIEW COl3/DETAILS LABELS */
export const tkvd = ["cs", "subject", "category", "division", "txid", "status"];

/**SUPPORT/TICKET TABLE labels */
export const tkll = ["id", "date", "subject", "category", "status"];
