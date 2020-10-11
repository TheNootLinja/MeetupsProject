import { writable } from "svelte/store";

const meetups = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subtitle: "Learn to code in 2 hours",
        description:
          "In this meetup, we will have some experts to teach you how to code",
        image: "https://picsum.photos/1000/1000",
        address: "27th Nerd Road, 32523 New York",
        contactEmail: "code@test.com",
        isFavorite: false,
      },
      {
        id: "m2",
        title: "Svelte Together",
        subtitle: "Let's learn Svelte together!",
        description: "Just another description for our date",
        image: "https://picsum.photos/1000/1000",
        address: "29th Nerd Road, 32523 New York",
        contactEmail: "code@test.com",
        isFavorite: false,
      },
]);

const customerMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false
        };
        meetups.update(items => {
            return [newMeetup, ...items]
        });
    },
    toggleFavorite: (id) => {
        meetups.update(items => {
                // Grabbing the item that will be updated by matching the id variable to the
    // id in the array
    const updatedMeetup = { ...items.find((m) => m.id === id) };
      // Setting the value of the isFavorite prop to the opposite of whatever it
      // currently is set to.
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      // Finding the index of the item we are updating in the meetups array by
      // using the findIndex function and having it check for the id
      const meetupIndex = items.findIndex((m) => m.id === id);
      // setting the updatedMeetups var eaual to the spread of the old meetups array
      const updatedMeetups = [...items];
      // Swapping the item and the index of the old item to the new item in the updatedMeetups
      // array so it now includes our changes
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
        });
    }
};

export default customerMeetupsStore;