const { Schema, model } = require("mongoose");

const HostipalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "hospitales" }
);

HostipalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( "Hospital", HostipalSchema );
