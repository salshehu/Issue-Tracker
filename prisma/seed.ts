import prisma from "./client";

const seedDevDb = async () => {
  await prisma.developers.deleteMany();
  await prisma.developers.createMany({
    data: [
      {
        userName: "Kofi_ganyp",
        firstName: "Kofi",
        lastName: "Ganyo",
        email: "kganyo@ymail.com",
        profilePic: "",
      },
      {
        userName: "g_kingsley",
        firstName: "George",
        lastName: "Kingsley",
        email: "kings@bmail.com",
        profilePic: "",
      },
      {
        userName: "roverman",
        firstName: "Danier",
        lastName: "Roger",
        email: "drover@ymail.com",
        profilePic: "",
      },
      {
        userName: "cadigan",
        firstName: "Cathering",
        lastName: "Nzema",
        email: "cath@lmail.com",
        profilePic: "",
      },
      {
        userName: "kjb",
        firstName: "Kojo",
        lastName: "Larbi",
        email: "klarb@ymail.com",
        profilePic: "",
      },
      {
        userName: "mansoor",
        firstName: "Zihad",
        lastName: "Mansoorudeen",
        email: "ziman@ymail.com",
        profilePic: "",
      },
    ],
  });
};

const seedIssueDb = async () => {
  await prisma.issue.deleteMany();
  await prisma.issue.createMany({
    data: [
      {
        title: "Website Login Issue",
        description:
          "Users are unable to log in to the website. They receive an error message when attempting to sign in.",
        status: "OPEN",
        createdAt: "2023-09-01T10:00:00.000Z",
        updatedAt: "2023-09-01T10:00:00.000Z",
      },
      {
        title: "Product Page Loading Slowly",
        description:
          "The product page is taking a long time to load, causing a poor user experience.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-02T11:15:00.000Z",
        updatedAt: "2023-09-05T16:00:00.000Z",
      },
      {
        title: "Payment Gateway Down",
        description:
          "The payment gateway is currently offline, preventing customers from making purchases.",
        status: "CLOSED",
        createdAt: "2023-09-03T12:30:00.000Z",
        updatedAt: "2023-09-08T01:15:00.000Z",
        dateCompleted: "2023-09-13T10:40:00.000Z",
      },
      {
        title: "Mobile App Crashes on Launch",
        description:
          "The mobile app crashes immediately upon launch, making it unusable.",
        status: "OPEN",
        createdAt: "2023-09-04T13:45:00.000Z",
        updatedAt: "2023-09-04T13:45:00.000Z",
      },
      {
        title: "Order Tracking Not Updating",
        description:
          "Customers are unable to track their orders as the tracking information is not being updated.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-05T14:00:00.000Z",
        updatedAt: "2023-09-06T10:50:00.000Z",
      },
      {
        title: "Missing Product Images",
        description:
          "Some product images are missing from the catalog, making it hard for customers to view products.",
        status: "CLOSED",
        createdAt: "2023-09-06T15:15:00.000Z",
        updatedAt: "2023-09-21T07:35:00.000Z",
        dateCompleted: "2023-10-12T18:05:00.000Z",
      },
      {
        title: "Password Reset Not Working",
        description:
          'Users cannot reset their passwords using the "Forgot Password" feature on the website.',
        status: "OPEN",
        createdAt: "2023-09-07T16:30:00.000Z",
        updatedAt: "2023-09-07T16:30:00.000Z",
      },
      {
        title: "Checkout Process Errors",
        description:
          "Customers are encountering errors during the checkout process, preventing them from completing orders.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-08T17:45:00.000Z",
        updatedAt: "2023-10-12T13:31:00.000Z",
      },
      {
        title: "Email Notifications Delayed",
        description:
          "Email notifications, such as order confirmations and shipping updates, are being delayed.",
        status: "CLOSED",
        createdAt: "2023-09-09T18:00:00.000Z",
        updatedAt: "2023-10-26T06:57:00.000Z",
        dateCompleted: "2023-11-14T03:40:00.000Z",
      },
      {
        title: "Broken Links on Homepage",
        description:
          "There are broken links on the homepage that need to be fixed for a seamless user experience.",
        status: "OPEN",
        createdAt: "2023-09-10T19:15:00.000Z",
        updatedAt: "2023-09-10T19:15:00.000Z",
      },
      {
        title: "Inventory Sync Issue",
        description:
          "The inventory levels are not syncing correctly, leading to discrepancies between online and offline stock.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-11T20:30:00.000Z",
        updatedAt: "2023-10-08T06:37:00.000Z",
      },
      {
        title: "Performance Degradation on Server",
        description:
          "The server is experiencing performance degradation, causing slow response times.",
        status: "CLOSED",
        createdAt: "2023-09-12T21:45:00.000Z",
        updatedAt: "2023-10-18T01:34:00.000Z",
        dateCompleted: "2023-12-12T21:45:00.000Z",
      },
      {
        title: "Broken Search Functionality",
        description:
          "The search functionality on the website is not returning accurate results or is not working at all.",
        status: "OPEN",
        createdAt: "2023-09-13T22:00:00.000Z",
        updatedAt: "2023-09-13T22:00:00.000Z",
      },
      {
        title: "SSL Certificate Expiry",
        description:
          "The SSL certificate is nearing its expiry date and needs to be renewed to ensure secure connections.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-14T23:15:00.000Z",
        updatedAt: "2023-09-27T11:36:00.000Z",
      },
      {
        title: "Incorrect Product Pricing",
        description:
          "Some products are displaying incorrect prices, leading to pricing discrepancies.",
        status: "CLOSED",
        createdAt: "2023-09-15T09:30:00.000Z",
        updatedAt: "2023-11-29T04:22:00.000Z",
        dateCompleted: "2023-12-01T07:40:00.000Z",
      },
      {
        title: "404 Error on Blog Pages",
        description:
          "Visitors are encountering 404 errors when trying to access blog articles on the website.",
        status: "OPEN",
        createdAt: "2023-09-16T10:45:00.000Z",
        updatedAt: "2023-09-16T10:45:00.000Z",
      },
      {
        title: "Customer Support Chat Unavailable",
        description:
          "The live chat support feature is currently unavailable, leaving customers without immediate assistance.",
        status: "IN_PROGRESS",
        createdAt: "2023-09-17T12:00:00.000Z",
        updatedAt: "2023-10-02T09:07:00.000Z",
      },
      {
        title: "Missing User Profile Data",
        description:
          "User profile data, such as names and contact information, is missing for some accounts.",
        status: "CLOSED",
        createdAt: "2023-09-18T13:15:00.000Z",
        updatedAt: "2023-09-27T18:36:00.000Z",
        dateCompleted: "2023-11-12T05:17:00.000Z",
      },
      {
        title: "Payment Refund Request",
        description:
          "A customer has requested a refund for an order, and it needs to be processed promptly.",
        status: "OPEN",
        createdAt: "2023-09-19T14:30:00.000Z",
        updatedAt: "2023-09-19T14:30:00.000Z",
      },
      {
        title: "Broken Checkout Button",
        description:
          'The "Checkout" button on the website is not functioning correctly, preventing order completion.',
        status: "IN_PROGRESS",
        createdAt: "2023-09-20T15:45:00.000Z",
        updatedAt: "2023-09-26T04:07:00.000Z",
      },
      {
        title: "Invalid user profile",
        description:
          "The profile page is unable to load user profile credentials",
        status: "OPEN",
        createdAt: "2023-10-17T04:07:00.000Z",
        updatedAt: "2023-09-26T04:07:00.000Z",
      },
      {
        title: "Submit button freezes",
        description:
          "The submit button disables and freezes when clicked to submit registration data",
        status: "IN_PROGRESS",
        createdAt: "2023-10-17T04:07:00.000Z",
        updatedAt: "2023-11-13T02:54:00.000Z",
      },
      {
        title: "Payment link not responding",
        description:
          "Subscribers link to payment gateway fails whenever Master Card option is selected",
        status: "IN_PROGRESS",
        createdAt: "2023-10-17T04:07:00.000Z",
        updatedAt: "2023-11-10T02:20:00.000Z",
      },
      {
        title: "Wrong stock prices",
        description: "Reports on stock turnover feed on out-dated stock prices",
        status: "OPEN",
        createdAt: "2023-11-15T04:07:00.000Z",
        updatedAt: "2023-11-15T04:07:00.000Z",
      },
      {
        title: "Incorrect receivables",
        description:
          "The balance on accounts receivables does not factor in contra transactions thereby mis-stating receivables",
        status: "CLOSED",
        createdAt: "2023-10-17T04:07:00.000Z",
        updatedAt: "2023-10-23T06:41:00.000Z",
        dateCompleted: "2023-12-10T04:07:00.000Z",
      },
      {
        title: "Broken links",
        description:
          "The links to gogole and Github Oauth authentication are not responding",
        status: "OPEN",
        createdAt: "2023-11-04T04:07:00.000Z",
        updatedAt: "2023-11-04T04:07:00.000Z",
      },
      {
        title: "Form data rejection",
        description:
          "User form gets rejected whenever profile picture is changed",
        status: "IN_PROGRESS",
        createdAt: "2023-11-13T04:07:00.000Z",
        updatedAt: "2023-11-17T16:39:00.000Z",
      },
      {
        title: "Corrupt links",
        description:
          "The links to payments details are linking to customer info page in error",
        status: "CLOSED",
        createdAt: "2023-11-17T11:07:00.000Z",
        updatedAt: "2023-11-25T08:20:00.000Z",
        dateCompleted: "2023-12-14T13:19:00.000Z",
      },
      {
        title: "Data migration",
        description: "Reports are not loading after data migration take place",
        status: "OPEN",
        createdAt: "2023-12-05T09:25:00.000Z",
        updatedAt: "2023-12-05T09:39:00.000Z",
      },
    ],
  });
};

async function main() {
  console.log("seeding database about to commence");
  seedDevDb();
  seedIssueDb();
}

main()
  .then(() => console.log("DB seeding was successfull"))
  .catch((e) => console.log("Something went horribly wrong", e.message));
// .finally(async () => await prisma.$disconnect());

// use 'npx prisma db seed' to run file in nextjs
