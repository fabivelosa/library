package com.ait.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ClassesDTO {
	private int class_id, class_duration;
	private String class_title, class_category, class_slot, class_fee, class_start;
	private int registrationId;
	private String picture;


	public int getClass_id() {
		return class_id;
	}
	public void setClass_id(int class_id) {
		this.class_id = class_id;
	}
	public int getClass_duration() {
		return class_duration;
	}
	public void setClass_duration(int class_duration) {
		this.class_duration = class_duration;
	}
	public String getClass_title() {
		return class_title;
	}
	public void setClass_title(String class_title) {
		this.class_title = class_title;
	}
	public String getClass_category() {
		return class_category;
	}
	public void setClass_category(String class_category) {
		this.class_category = class_category;
	}
	public String getClass_slot() {
		return class_slot;
	}
	public void setClass_slot(String class_slot) {
		this.class_slot = class_slot;
	}
	public String getClass_fee() {
		return class_fee;
	}
	public void setClass_fee(String class_fee) {
		this.class_fee = class_fee;
	}
	public String getClass_start() {
		return class_start;
	}
	public void setClass_start(String class_start) {
		this.class_start = class_start;
	}

	public int getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(int registrationId) {
		this.registrationId = registrationId;
	}

	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "ClassesDTO [class_id=" + class_id + "]";
	}
}
