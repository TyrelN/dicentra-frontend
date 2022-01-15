<template>
  <div>
    <div class="items-center" style="margin: auto; max-width: 900px">
      <div class="col shadow-14 q-mx-lg q-mt-lg" style="border-radius: 25px">
        <q-carousel
          animated
          v-model="slide"
          height="400px"
          infinite
          :autoplay="autoplay"
          transition-prev="slide-right"
          transition-next="fade"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          style="border-radius: 10px"
        >
          <q-carousel-slide :name="1" img-src="../assets/luckymobile.webp" />
          <q-carousel-slide :name="2" img-src="../assets/cat6re.webp" />
          <q-carousel-slide :name="3" img-src="../assets/cat8re.webp" />
          <q-carousel-slide :name="4" img-src="../assets/cat18re.webp" />
          <q-carousel-slide :name="5" img-src="../assets/cat20re.webp" />
        </q-carousel>
      </div>

      <div
        class="relative-position"
        style="
          margin-left: auto;
          margin-right: auto;
          max-height: 200px;
          max-width: 600px;
          bottom: 2vh;
        "
      >
        <q-img
          src="../assets/nvars-logo-dark.svg"
          :ratio="16 / 9"
          fit="cover"
          alt="home"
          loading="eager"
        >
        </q-img>
      </div>
      <div class="row items-center" style="max-width: 900px">
        <div class="text-center q-ma-xl">
          <div class="col-12 q-mt-md text-dark text-h3" style="opacity: 0.8">
            Our Calling
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-5 q-my-lg">
              <div class="col-12 q-mt-md text" style="opacity: 0.8">
                The Nicola Valley Animal Rescue Society is a non-profit rescue
                organization dedicated to providing every animal in our region
                with a permanent home and a pampered life. NVARS has been
                working tirelessly for over 15 years in an effort to provide
                sanctuary to abandoned animals.
              </div>
              <div class="col-12 q-mt-md text" style="opacity: 0.8">
                The Nicola Valley is rife with misinformation, and has a
                terrible track record of pet abandonment and poor care. Our goal
                is to educate on all matters that can better the lives of the
                animals in our valley. We hope to facilitate an adoption
                environment that guarantees wonderful homes for prospective
                pets.
              </div>
            </div>
            <div
              class="relative-position col-xs-12 col-md-6 q-ma-xl"
              style="max-width: 600px; margin: auto"
            >
              <q-img
                class="q-my-xl"
                style="border-radius: 10px"
                src="../assets/cat17re.webp"
                alt="aboutpic"
              >
              </q-img>
            </div>
          </div>
          <div class="col-12 q-mt-md text-h4" style="opacity: 0.8">TNR</div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            In the spirit of education, we hope to inform the Nicola Valley on
            the practice and benefits of Trap-Neuter-Return (or TNR):
          </div>
          <div class="q-pa-lg"></div>
          <div
            class="col-12 q-mt-md text-weight-bold text-h5"
            style="opacity: 0.8"
          >
            Locate
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            We have no means of finding abandoned cats in the region unless
            notified. The sooner we are aware, the quicker we can spay/neuter
            them. Cats can easily reproduce three times annually, with kittens
            able to reproduce at six months old. Left unchecked, the local cat
            population will only continue to explode. Repeated litters also put
            pressure on the cats themselves with an expanding community that is
            starving and abandoned.
          </div>

          <div
            class="col-12 q-mt-md text-weight-bold text-h5"
            style="opacity: 0.8"
          >
            Feed
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            Abandoned communities require a consistent location to find food,
            this creates an opportunity to trap them with a higher success rate,
            while also building trust in the humans involved. It is common for
            notifiers to refer to three or so cats in an area, and when we begin
            feeding that three turns into over a dozen! Cats love a steady
            routine, and so do we! Routine lets us document numbers and visible
            problems that we can inform the vets on.
          </div>

          <div
            class="col-12 q-mt-md text-weight-bold text-h5"
            style="opacity: 0.8"
          >
            Trap
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            We never leave a cat in a trap unattended, which means when trapping
            begins we rely on knowledgeable volunteeres lined up to cover 24
            hours, in addition to a vet time arranged for the following day.
            Trapping is extremely stressful for the cats, so we take every
            measure possible to make this necessary process as quick as
            possible. Trapping continues in a particular area until we are
            confident that all cats in the area are sterilized. Even one
            unsterilized cat can lead to a population explosion.
          </div>
          <div
            class="col-12 q-mt-md text-weight-bold text-h5"
            style="opacity: 0.8"
          >
            Evaluation
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            The vetting process consists of sterilization, tattooing,
            vaccination, health checkup, revolution, and additional medical
            interventions as needed. During this process, with the partnership
            of knowledgeable foster homes in our area, we evaluate each cats
            health and potential for adoption. With kittens, it is often
            possible to move them into shelter areas where they can be more
            quickly socialized and adopted. Regrettably, most adults must be
            returned to their colony, which is never easy for us.
          </div>

          <div
            class="col-12 q-mt-md text-weight-bold text-h5"
            style="opacity: 0.8"
          >
            Return & Colony Care
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            We ensure that all cats returned to their colonies are fed and cared
            for daily. We strive for adequate shelter for extreme weather, and
            monitor their health for medical complications. In time some adults
            begin to show trust in their caregivers. We always hope for a
            breakthrough that will allow adults who show trust in humans again
            to be adopted into a home perfect for them. Caregivers watch for
            newcomers to get them sterilized right away, however with the high
            number of abandoned cats in Merritt, some colonies are increased and
            more are formed every day.
          </div>
          <div class="q-pa-lg"></div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            Hopefully this description has helped you to understand the
            importance of our TNR process, and also made clear our desperate
            need for volunteers, foster homes and perfect permanent homes in our
            community.
          </div>
          <div class="relative-position">
            <q-img
              class="q-my-xl"
              style="border-radius: 10px"
              src="../assets/moresized.webp"
              alt="mopic"
            >
            </q-img>
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            Besides applying to volunteer, any notice of stray dogs or abandoned
            cats in your area will help us immensely to care for them, and
            ensure their population doesn't skyrocket. Contact us at
            info@nvars.com if you notice or suspect anything in your area!
          </div>
          <div class="col-12 q-mt-md text" style="opacity: 0.8">
            Donations, volunteers, fosters, informants and good homes. There are
            many ways you can help us on our journey towards a British Columbia where
            everyone treats each other with care.
          </div>
          <q-btn
            @click="$router.push('/donate')"
            color="dark"
            style="width: 300px; height: 50px; top: 8vh"
          >
            Donate
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useMeta } from "quasar";
useMeta({
  title: "About Us",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"A page for learning more about our values as an animal rescue"}
  }
});
//enables the carousel at the top of the page
const slide = ref(1);
const autoplay = ref(true);
</script>
