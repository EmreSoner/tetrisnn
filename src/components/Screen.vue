<template>
  <div id="screen">
    <div v-for="(row, row_index) in board" :key="row_index">
      <div class="block" v-for="(col, col_index) in row" :key="col_index">
        <div class="tetramino-block" v-if="col" v-bind:style="'background-color:' + col.shape.color + ';'"></div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: bulk import
import hero from "@/tetraminos/Hero";
import clevelandZ from "@/tetraminos/ClevelandZ";
import orangeRicky from "@/tetraminos/OrangeRicky";
import rhodeIslandZ from "@/tetraminos/RhodeIslandZ";
import teeWee from "@/tetraminos/TeeWee";
import smashBoy from "@/tetraminos/SmashBoy";
import blueRicky from "@/tetraminos/BlueRicky";
import engine from "@/service/Engine";

export default {
  name: "Screen",
  created: function() {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.rotate();
      }

      if (e.key === 'a') {
        this.moveLeft();
      }

      if (e.key === 'd') {
        this.moveRight();
      }

      if (e.key === 's') {
        this.moveDown();
      }
    });
  },
  mounted: function() {
    this.initTetraminos();
    this.initBoard();
    this.startGame();
  },
  data: function() {
    return {
      engine: new engine(),
      WIDTH: 20,
      HEIGHT: 30,
      board: [],
      tetraminos: [],
      currentTetramino: null,
      game: null,
    }
  },
  methods: {
    initBoard: function() {
      this.board = this.engine.initBoard(this.WIDTH, this.HEIGHT);
    },

    initTetraminos: function() {
      this.tetraminos.push(blueRicky);
      this.tetraminos.push(clevelandZ);
      this.tetraminos.push(hero);
      this.tetraminos.push(orangeRicky);
      this.tetraminos.push(rhodeIslandZ);
      this.tetraminos.push(smashBoy);
      this.tetraminos.push(teeWee);
    },

    insertTetramino: function() {
      this.board = [];
      let rows = this.engine.rows;

      try {
        this.currentTetramino = this.selectTetramino();
        this.board = this.engine.insert(this.currentTetramino);
      } catch(err) {
        if (err === "unavailable_insert") {
          clearInterval(this.game);
          this.gameOver();
          this.board = rows;
        }
      }
    },

    selectTetramino: function() {
      return new this.tetraminos[Math.floor(Math.random() * this.tetraminos.length)]();
    },

    moveDown: function() {
      this.board = [];
      let rows = this.engine.rows;

      try {
        this.board = this.engine.moveDown(this.currentTetramino);
      } catch (err) {
        if (err === "unavailable_move") {
          this.currentTetramino = null;
          this.clearSuccessRows();
          this.board = rows;
        }
      }
    },

    moveLeft: function() {
      this.board = [];
      this.board = this.engine.moveLeft(this.currentTetramino);
    },

    moveRight: function() {
      this.board = [];
      this.board = this.engine.moveRight(this.currentTetramino);
    },

    rotate: function() {
      this.board = [];
      this.board = this.engine.rotate(this.currentTetramino);
    },

    clearSuccessRows() {
      this.board = [];
      this.board = this.engine.clearSuccessRows();
    },

    gameOver() {
      this.board = [];
      this.board = this.engine.rows;
      console.log('Game Over');
    },

    startGame() {
      this.game = setInterval(() => {
        if (this.currentTetramino === null) {
          this.insertTetramino();
        } else {
          this.moveDown();
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
  #screen {
    background-color: black;
    width: 400px;
    height: 600px;

    content: "";
    display: table;
    clear: both;
  }

  .block {
    float: left;
    width: 20px;
    height: 20px;
  }

  .tetramino-block {
    width: 20px;
    height: 20px;
  }
</style>
