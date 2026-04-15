import React, { useState } from "react";
import axios from "axios";
import "./GithubSearch.css";
import { FaMapMarkerAlt, FaGithub, FaTwitter } from "react-icons/fa";
import { PiBuildingFill } from "react-icons/pi";

const GithubSearch = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setProfile(null);
      setError("User Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">Github Profile Detective</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter Github Username.."
          value={username}
          className="search-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="search-btn">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-img">
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="profile-avatar"
              />
            </div>

            <div className="profile-details">
              <div className="profile-des">
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-created">
                  Joined: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="profile-username"
              >
                @{profile.login}
              </a>

              <p className="profile-bio">{profile.bio}</p>

              <div className="profile-stats">
                <p>
                  Repositories <br />
                  <span>{profile.public_repos}</span>
                </p>
                <p>
                  Followers <br />
                  <span>{profile.followers}</span>
                </p>
                <p>
                  Following <br />
                  <span>{profile.following}</span>
                </p>
              </div>

              <div className="profile-info">
                {profile.location && (
                  <p>
                    <FaMapMarkerAlt /> {profile.location}
                  </p>
                )}
                {profile.company && (
                  <p>
                    <PiBuildingFill /> {profile.company}
                  </p>
                )}
              </div>

              <div className="profile-links">
                {profile.twitter_username && (
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter /> {profile.twitter_username}
                  </a>
                )}

                <a href={profile.html_url} target="_blank" rel="noreferrer">
                  <FaGithub /> View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
