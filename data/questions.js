// This file contains only question data.
// Teachers can edit this file without changing the quiz logic in script.js.

const questions = [
  {
    text: "A hockey puck is sliding on very smooth ice after being hit. What keeps it moving forward?",
    options: [
      {
        text: "A forward force from the hit continues to push it.",
        correct: false,
        misconception: "Motion requires a continuous force",
        feedback: "The hit gave the puck motion, but the hitting force stopped when the stick lost contact. On smooth ice, the puck keeps moving because there is little friction.",
        counterExample: "A spacecraft can keep moving through space after its engine turns off because there is very little resistance."
      },
      {
        text: "It keeps moving because there is little friction slowing it down.",
        correct: true,
        feedback: "Correct. An object in motion tends to keep moving unless an unbalanced force, such as friction, changes its motion."
      },
      {
        text: "Gravity pulls it forward.",
        correct: false,
        misconception: "Gravity acts in the direction of motion",
        feedback: "Gravity pulls the puck downward toward Earth, not forward along the ice.",
        counterExample: "A ball rolling east and a ball rolling west are both pulled downward by gravity."
      },
      {
        text: "The ice pushes it forward.",
        correct: false,
        misconception: "Surfaces always push in the direction of motion",
        feedback: "The ice mainly pushes upward on the puck. Friction from the ice is very small and acts opposite the motion.",
        counterExample: "A table supports a book upward, but it does not push the book sideways across the table."
      }
    ]
  },
  {
    text: "A car is moving at a steady speed in a straight line. What can you say about the forces on it?",
    options: [
      {
        text: "The forward forces and backward forces are balanced.",
        correct: true,
        feedback: "Correct. Constant speed in a straight line means there is no unbalanced force overall."
      },
      {
        text: "There must be a bigger forward force than backward force.",
        correct: false,
        misconception: "Constant speed means a forward net force",
        feedback: "A bigger forward force would make the car speed up. At steady speed, the driving force balances air resistance and friction.",
        counterExample: "Cruise control keeps a car at steady speed by matching the resistive forces, not by constantly increasing speed."
      },
      {
        text: "There are no forces acting on the car.",
        correct: false,
        misconception: "Balanced forces mean no forces",
        feedback: "Balanced forces do not mean no forces. Gravity, the road, engine force, friction, and air resistance can all act while cancelling overall.",
        counterExample: "A book resting on a desk has gravity pulling down and the desk pushing up, even though it does not move."
      },
      {
        text: "Only gravity acts on the car.",
        correct: false,
        misconception: "Gravity is the only real force",
        feedback: "Gravity is one force, but the road, engine, friction, and air resistance can also act on the car.",
        counterExample: "When you brake, the car slows because friction from the brakes and road acts, not because gravity suddenly changes."
      }
    ]
  },
  {
    text: "Two students push a box with equal force in opposite directions. The box does not move. Why?",
    options: [
      {
        text: "The forces cancel, so the net force is zero.",
        correct: true,
        feedback: "Correct. Equal forces in opposite directions are balanced, so the box does not accelerate."
      },
      {
        text: "No forces are acting on the box.",
        correct: false,
        misconception: "Stationary objects have no forces",
        feedback: "The students are still pushing. The box stays still because the pushes are equal and opposite, not because forces are absent.",
        counterExample: "In tug-of-war, two teams can pull hard while the rope stays still if their forces are balanced."
      },
      {
        text: "The heavier student always wins.",
        correct: false,
        misconception: "Mass alone decides motion",
        feedback: "Motion depends on the net force on the box, not only on who has more mass.",
        counterExample: "A lighter person wearing grippy shoes may push harder than a heavier person standing on slippery ice."
      },
      {
        text: "The box uses up the forces.",
        correct: false,
        misconception: "Forces are used up by objects",
        feedback: "Forces are interactions, not stored supplies that objects use up. The pushes act at the same time and balance.",
        counterExample: "A wall can push back on your hand as long as you push on it; the force is not used up."
      }
    ]
  },
  {
    text: "A ball is thrown straight upward. At the highest point, just before it starts falling, what force acts on it?",
    options: [
      {
        text: "Only gravity, downward, if air resistance is ignored.",
        correct: true,
        feedback: "Correct. At the top, the ball's speed is momentarily zero, but gravity still pulls downward."
      },
      {
        text: "No force acts because it has stopped for an instant.",
        correct: false,
        misconception: "Zero speed means zero force",
        feedback: "The ball is momentarily not moving, but gravity is still acting and changes its motion downward.",
        counterExample: "A dropped ball starts from rest, but gravity acts on it immediately and makes it speed up downward."
      },
      {
        text: "An upward force is still stronger than gravity.",
        correct: false,
        misconception: "Thrown objects carry an upward force",
        feedback: "Your hand stopped pushing once the ball left your hand. The ball does not carry an upward force with it.",
        counterExample: "After a football leaves a player's foot, the foot is no longer pushing it."
      },
      {
        text: "Gravity disappears at the highest point.",
        correct: false,
        misconception: "Gravity only acts while objects fall",
        feedback: "Gravity acts on the ball throughout the whole trip: going up, at the top, and falling down.",
        counterExample: "The Moon stays in orbit because Earth's gravity acts on it even though it is not falling straight down to the ground."
      }
    ]
  },
  {
    text: "A feather and a metal coin are dropped in a tube with no air. What happens?",
    options: [
      {
        text: "The coin falls faster because it is heavier.",
        correct: false,
        misconception: "Heavier objects always fall faster",
        feedback: "Without air resistance, all objects near Earth fall with the same acceleration, whatever their mass.",
        counterExample: "Astronaut David Scott dropped a hammer and a feather on the Moon, and they landed together because there was almost no air."
      },
      {
        text: "The feather floats because it is light.",
        correct: false,
        misconception: "Light objects are not pulled by gravity",
        feedback: "Gravity pulls on light objects too. On Earth, feathers fall slowly mainly because air resistance is large compared with their weight.",
        counterExample: "Tiny raindrops and dust still fall because gravity acts on them."
      },
      {
        text: "They fall together at the same rate.",
        correct: true,
        feedback: "Correct. In a vacuum, there is no air resistance, so the feather and coin have the same acceleration."
      },
      {
        text: "The coin falls but the feather has no weight.",
        correct: false,
        misconception: "Very light objects have no weight",
        feedback: "The feather has weight because gravity pulls on its mass. Its weight is small, but not zero.",
        counterExample: "A single sheet of paper has a small weight that a sensitive scale can measure."
      }
    ]
  },
  {
    text: "A student pushes a shopping cart. Then they push with twice the force, and the cart has the same mass. What happens to its acceleration?",
    options: [
      {
        text: "The acceleration becomes about twice as large.",
        correct: true,
        feedback: "Correct. For the same mass, acceleration increases when the net force increases."
      },
      {
        text: "The acceleration stays the same because the mass is unchanged.",
        correct: false,
        misconception: "Mass alone controls acceleration",
        feedback: "Mass matters, but force matters too. With the same mass, a larger net force gives a larger acceleration.",
        counterExample: "The same empty cart speeds up more when you push harder."
      },
      {
        text: "The cart moves at twice the speed instantly.",
        correct: false,
        misconception: "Force changes speed instantly",
        feedback: "Force causes acceleration, which means speed changes over time. The speed does not jump instantly.",
        counterExample: "A bicycle takes time to speed up even when you pedal harder."
      },
      {
        text: "The cart becomes twice as heavy.",
        correct: false,
        misconception: "Pushing changes an object's mass",
        feedback: "Pushing harder does not change the cart's mass. It changes the net force acting on the cart.",
        counterExample: "A football has the same mass whether you tap it gently or kick it hard."
      }
    ]
  },
  {
    text: "A person sits on a chair. Which statement best describes the forces?",
    options: [
      {
        text: "The chair pushes up on the person, and gravity pulls the person down.",
        correct: true,
        feedback: "Correct. The upward support force balances the person's weight when the person is at rest."
      },
      {
        text: "Only the person's weight acts, because the chair is not alive.",
        correct: false,
        misconception: "Only living things can exert forces",
        feedback: "Non-living objects can exert forces. The chair pushes upward because it is compressed by the person.",
        counterExample: "A trampoline pushes you upward even though it is not alive."
      },
      {
        text: "The chair blocks gravity, so gravity stops acting.",
        correct: false,
        misconception: "Support forces switch gravity off",
        feedback: "Gravity still pulls downward. The chair provides an upward force that balances gravity.",
        counterExample: "A book on a shelf still has weight; the shelf supports it upward."
      },
      {
        text: "The person pushes down, but the chair does not push back.",
        correct: false,
        misconception: "Forces act one way only",
        feedback: "Forces come from interactions. The person pushes on the chair, and the chair pushes on the person.",
        counterExample: "When you press your hand on a wall, you can feel the wall pushing back on your hand."
      }
    ]
  },
  {
    text: "A bicycle slows down when the rider stops pedalling on a flat road. Why?",
    options: [
      {
        text: "Friction and air resistance act opposite the motion.",
        correct: true,
        feedback: "Correct. Resistive forces make the bicycle slow down when there is no driving force from pedalling."
      },
      {
        text: "The bicycle runs out of force.",
        correct: false,
        misconception: "Moving objects contain force",
        feedback: "Objects do not contain force. The bicycle slows because external forces, such as friction and air resistance, act on it.",
        counterExample: "A puck on smooth ice keeps moving much longer because there is less friction."
      },
      {
        text: "Gravity pulls backward on the bicycle.",
        correct: false,
        misconception: "Gravity opposes horizontal motion",
        feedback: "On a flat road, gravity pulls downward, not backward. Friction and air resistance oppose the motion.",
        counterExample: "A cyclist moving north and a cyclist moving south are both pulled downward by gravity."
      },
      {
        text: "The road stops pushing upward.",
        correct: false,
        misconception: "Losing support causes slowing",
        feedback: "The road still pushes upward while the bicycle is on it. Slowing is caused mainly by forces opposite the motion.",
        counterExample: "A parked bicycle is still supported by the road even though it is not moving."
      }
    ]
  }
];
