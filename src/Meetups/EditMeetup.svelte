<script>
  import meetups from "./meetups-store";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  import { notEmpty, isValidEmail } from "../helpers/validation.js";

  let title = "";
  let subtitle = "";
  let address = "";
  let imageUrl = "";
  let email = "";
  let description = "";

  const dispatch = createEventDispatcher();

  // Dynamic expressions for checking if data user entered is valid
  $: titleValid = notEmpty(title);
  $: subtitleValid = notEmpty(subtitle);
  $: addressValid = notEmpty(address);
  $: imageUrlValid = notEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: descValid = notEmpty(description);
  $: formValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    imageUrlValid &&
    emailValid &&
    descValid;

  // Function for submitting the new meetup form
  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      address: address,
      imageUrl: imageUrl,
      email: email,
      description: description,
    };
    meetups.addMeetup(meetupData);
    dispatch("save");
  }

  // Function for closing the modal
  function closeModal() {
    dispatch("closemodal");
  }

  document.onkeydown = function (event) {
    if (event.key === "Enter") {
      submitForm();
    } else if (event.key === "Escape") {
      closeModal();
    }
  };
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup" on:closemodal>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage={'Please enter a valid title!'}
      value={title}
      on:input={(event) => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage={'Please enter a valid subtitle!'}
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage={'Please enter a valid address!'}
      value={address}
      on:input={(event) => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage={'Please enter a valid image URL!'}
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      valid={emailValid}
      validityMessage={'Please enter a valid email address!'}
      type="email"
      value={email}
      on:input={(event) => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      valid={descValid}
      validityMessage={'Please enter a valid description!'}
      type="description"
      value={description}
      on:input={(event) => (description = event.target.value)} />
  </form>
  <div>
    <Button type="button" mode="outline" on:click={closeModal}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formValid}>
      Save
    </Button>
  </div>
</Modal>
