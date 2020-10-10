<script>
  import Header from "./UI/header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let editMode;

  let meetups = [
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
  ];

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      image: event.detail.imageUrl,
      address: event.detail.address,
      contactEmail: event.detail.email,
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function closeModal() {
    editMode = null;
  }
  function toggleFavorite(event) {
    // getting the id of them item that we passed through our event propagation
    const id = event.detail;
    // Grabbing the item that will be updated by matching the id variable to the
    // id in the array
    const updatedMeetup = {
      ...meetups.find((m) => m.id === id),
    };
    // Setting the value of the isFavorite prop to the opposite of whatever it
    // currently is set to.
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    // Finding the index of the item we are updating in the meetups array by
    // using the findIndex function and having it check for the id
    const meetupIndex = meetups.findIndex((m) => m.id === id);
    // setting the updatedMeetups var eaual to the spread of the old meetups array
    const updatedMeetups = [...meetups];
    // Swapping the item and the index of the old item to the new item in the updatedMeetups
    // array so it now includes our changes
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:closemodal={closeModal} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
