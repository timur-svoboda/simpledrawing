<template>
  <div
    id="guide-modal-window"
    class="guide-modal-window"
    v-if="!isHiddenGuideWindow"
  >
    <div class="guide-modal-window__lang" v-if="guideStep === 0">
      <span>Language: </span>
      <select
        class="guide-modal-window__lang-select"
        v-model="currentGuideLanguage"
      >
        <option
          v-for="language of guideLanguages"
          :value="language.id"
          :key="language.id"
          >{{ language.label }}</option
        >
      </select>
    </div>
    <div class="guide-modal-window__content" v-html="currentGuideText"></div>
    <nav class="guide-modal-window__navigation">
      <button
        @click="guideStep = guideTexts.length - 1"
        class="guide-modal-window__button"
        v-if="guideStep < guideTexts.length - 1"
      >
        {{ currentGuideLanguage === "en" ? "Skip" : "Пропустить" }}
      </button>
      <button
        @click="guideStep -= 1"
        class="guide-modal-window__button"
        v-if="guideStep > 0"
      >
        {{ currentGuideLanguage === "en" ? "Prev" : "Назад" }}
      </button>
      <button
        @click="guideStep += 1"
        class="guide-modal-window__button"
        v-if="guideStep < guideTexts.length - 1"
      >
        {{ currentGuideLanguage === "en" ? "Next" : "Вперёд" }}
      </button>
      <button
        class="guide-modal-window__button"
        v-if="guideStep === guideTexts.length - 1"
        @click="isHiddenGuideWindow = true"
      >
        {{ currentGuideLanguage === "en" ? "Close" : "Закрыть" }}
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      isHiddenGuideWindow: false
    };
  },
  computed: {
    currentGuideLanguage: {
      get() {
        return this.$store.getters.getCurrentGuideLanguage;
      },
      set(value) {
        this.$store.commit("setCurrentGuideLanguage", value);
      }
    },
    guideLanguages() {
      return this.$store.getters.getGuideLanguages;
    },
    guideStep: {
      get() {
        return this.$store.getters.getGuideStep;
      },
      set(value) {
        this.$store.commit("setGuideStep", value);
      }
    },
    guideTexts() {
      return this.$store.getters.getGuideTexts;
    },
    currentGuideText() {
      const step = this.$store.getters.getGuideStep;
      const lang = this.$store.getters.getCurrentGuideLanguage;
      return this.$store.getters.getGuideTexts[step][lang];
    }
  }
};
</script>

<style lang="stylus">
.guide-modal-window
  width 600px
  padding 20px 10px
  position absolute
  top 10px
  right 10px
  border 1px solid rgba( 255, 255, 255, 0.1 )
  border-radius 10px
  background-color rgba(51,71,91, 0.85)
  color #fff
  font-family: Arial, sans-serif
  line-height 1.5
  .hide
    display none
  a
    color rgba( 65, 184, 131, 1 )

.guide-modal-window__lang-select
  margin-left 10px
  border 1px solid #fff
  border-radius 3px
  padding 5px
  font-family: Arial, sans-serif
  color #fff
  background transparent
  &:focus
    outline none
  option
    color #000

.guide-modal-window__navigation
  display flex
  justify-content flex-end
  user-select none

.guide-modal-window__button
  margin-left 10px
  border 1px solid #fff
  background transparent
  color #fff
  font-family Arial, sans-serif
  padding 5px 15px
  border-radius 3px
  font-size 14px
  cursor pointer
  transition all 150ms ease-in-out
  &:focus
    outline none
  &:hover
    background-color: #fff
    color rgba(51,71,91, 1)
</style>
