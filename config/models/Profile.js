const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    company: {
      type: String
    },

    website: {
      type: String
    },

    location: {
      type: String
    },

    status: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      required: true
    },

    bio: {
      type: String
    },

    githubUsername: {
      type: String
    },

    experience: {
      type: [
        {
          title: {
            type: String,
            required: true
          },
          company: {
            type: String,
            required: true
          },
          location: {
            type: String
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      default: []
    },

    education: {
      type: [
        {
          degree: {
            type: String,
            required: true
          },
          fieldOfStudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      default: []
    },

    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
