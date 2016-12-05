---
layout: default
title: Blog
---
<div class="container">
  <div class="blog-posts">
    {% for post in site.posts %}
      <div class="blog-post spacing">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p class="summary">
          <!-- {{ post.categories }} -->
          <span class="date">
            {{ post.date | date: '%B %d, %Y' }}
          </span>
        </p>
        <!-- {{ post.excerpt.text }} -->
      </div>
    {% endfor %}
  </div>
</div>
